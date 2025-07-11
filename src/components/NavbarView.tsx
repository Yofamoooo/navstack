'use client';

import { useEffect, useState } from 'react';
import {
  Code,
  Monitor,
  Heart,
  Smartphone,
  Tablet,
  MonitorSmartphone,
  Search,
  RefreshCcw,
} from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';

interface NavbarData {
  id: number;
  name: string;
  type: string;
  framework: string;
  content: string;
  script: string;
}

interface FrameworkMeta {
  name: string;
  icon: string;
  description: string;
}

export default function NavbarSectionGroup() {
  const [groupedNavbars, setGroupedNavbars] = useState<Record<string, NavbarData[]>>({});
  const [frameworkMeta, setFrameworkMeta] = useState<FrameworkMeta[]>([]);
  const [visibleCode, setVisibleCode] = useState<Record<string, boolean>>({});
  const [selectedFrameworks, setSelectedFrameworks] = useState<Record<string, string>>({});
  const [showJsCode, setShowJsCode] = useState<Record<string, boolean>>({});
  const [iframeSize, setIframeSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [globalFramework, setGlobalFramework] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/api/navbars')
      .then((res) => res.json())
      .then((data: NavbarData[]) => {
        const grouped = data.reduce((acc: Record<string, NavbarData[]>, item) => {
          if (!acc[item.name]) acc[item.name] = [];
          acc[item.name].push(item);
          return acc;
        }, {});
        setGroupedNavbars(grouped);

        const defaultFrameworks: Record<string, string> = {};
        Object.entries(grouped).forEach(([name, items]) => {
          defaultFrameworks[name] = items[0].framework;
        });
        setSelectedFrameworks(defaultFrameworks);
      })
      .finally(() => setIsLoading(false));

    const storedFav = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFav);

    // Ambil data framework metadata
    fetch('http://localhost:3001/api/frameworks')
      .then((res) => res.json())
      .then((data: FrameworkMeta[]) => setFrameworkMeta(data));
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [groupedNavbars, visibleCode, showJsCode, selectedFrameworks]);

  const getFrameworkInfo = (name: string) =>
    frameworkMeta.find((f) => f.name === name);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'));
  };

  const toggleFavorite = (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter((fid) => fid !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const sanitizeContent = (html: string, script: string): string => {
    const disabledLinks = html.replace(
      /<a\s+([^>]*?)href="[^"]*"/gi,
      '<a $1href="#" onclick="return false"'
    );

    const style = `<style>body { margin: 0; font-family: sans-serif; }</style>`;
    const scriptTag = `<script>${script}</script>`;

    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">${style}</head><body>${disabledLinks}${scriptTag}</body></html>`;
  };

  const iframeHeight = { mobile: '400px', tablet: '400px', desktop: '200px' };
  const iframeWidth = { mobile: '375px', tablet: '768px', desktop: '100%' };

  const allFrameworks = Array.from(new Set(frameworkMeta.map((fw) => fw.name)));

  const filteredNavbars = Object.entries(groupedNavbars).filter(([name, items]) => {
    const frameworkMatch = globalFramework
      ? items.some((i) => i.framework === globalFramework)
      : true;
    const favoriteMatch = showOnlyFavorites
      ? items.some((i) => favorites.includes(i.id))
      : true;
    const nameMatch = name.toLowerCase().includes(searchTerm.toLowerCase());

    return frameworkMatch && favoriteMatch && nameMatch;
  });

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 space-y-20 bg-white text-black">
      {/* Filter Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
        <div className="flex gap-2">
          {[{ label: 'Mobile', icon: <Smartphone size={16} />, value: 'mobile' },
            { label: 'Tablet', icon: <Tablet size={16} />, value: 'tablet' },
            { label: 'Desktop', icon: <MonitorSmartphone size={16} />, value: 'desktop' }
          ].map(({ label, icon, value }) => (
            <button
              key={value}
              onClick={() => setIframeSize(value as typeof iframeSize)}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-full transition-all
                ${iframeSize === value
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center w-full sm:w-auto flex-wrap">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search navbars..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={globalFramework}
            onChange={(e) => setGlobalFramework(e.target.value)}
            className="text-sm px-3 py-1.5 rounded-full border bg-gray-100 text-gray-700"
          >
            <option value="">All Frameworks</option>
            {allFrameworks.map((fw) => (
              <option key={fw} value={fw}>{fw}</option>
            ))}
          </select>

          <button
            onClick={() => setShowOnlyFavorites((prev) => !prev)}
            className={`text-sm flex items-center gap-1 px-3 py-1.5 rounded-full transition ${
              showOnlyFavorites ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            <Heart size={14} /> {showOnlyFavorites ? 'Favorites Only' : 'All'}
          </button>

          <button
            onClick={() => {
              setSearchTerm('');
              setGlobalFramework('');
              setShowOnlyFavorites(false);
            }}
            className="flex items-center gap-1 text-sm px-3 py-1.5 bg-gray-300 hover:bg-gray-400 rounded-full"
          >
            <RefreshCcw size={14} /> Reset
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center text-gray-500 text-sm py-10 animate-pulse">
          Loading navbar components...
        </div>
      )}

      {/* Navbar Cards */}
      {!isLoading &&
        filteredNavbars.map(([name, items]) => {
          const framework = globalFramework || selectedFrameworks[name] || items[0].framework;
          const current = items.find((item) => item.framework === framework);
          const isCode = visibleCode[name];
          const isJs = showJsCode[name];

          if (!current) return null;

          const fwInfo = getFrameworkInfo(framework);

          return (
            <section key={name} className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-6 py-3 rounded-full shadow-lg relative">
                  <img
                    src={`/images/${fwInfo?.icon || 'default.png'}`}
                    alt={framework}
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold text-sm">{name}</h2>
                    <p className="text-xs text-white/80">{fwInfo?.description}</p>
                  </div>
                  <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-yellow-400 text-black text-[10px] font-semibold px-2 py-0.5 rounded-full shadow">
                    {framework}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(current.id)}
                    className={`text-xs px-3 py-1 rounded-full ${
                      favorites.includes(current.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-300 text-black'
                    }`}
                  >
                    <Heart size={14} className="inline" />
                  </button>

                  <div className="inline-flex rounded-3xl bg-gray-300 p-1 shadow-sm">
                    <button
                      onClick={() => setVisibleCode((prev) => ({ ...prev, [name]: false }))}
                      className={`flex items-center px-5 py-2 rounded-3xl text-sm font-medium ${
                        !isCode ? 'bg-white text-gray-700' : 'text-gray-700'
                      }`}
                    >
                      <Monitor size={16} className="mr-1" /> Preview
                    </button>
                    <button
                      onClick={() => setVisibleCode((prev) => ({ ...prev, [name]: true }))}
                      className={`flex items-center px-5 py-2 rounded-3xl text-sm font-medium ${
                        isCode ? 'bg-white text-gray-700' : 'text-gray-700'
                      }`}
                    >
                      <Code size={16} className="mr-1" /> Code
                    </button>
                  </div>
                </div>
              </div>

              {!isCode ? (
                <div className="bg-white p-4 shadow-xl rounded-xl preview-container">
                  <p className="text-sm text-gray-600 mb-4">
                    Preview in sandbox <strong>Real Time</strong>. Wait a few moments if it doesn't appear.
                  </p>
                  <div className="flex justify-center">
                    <iframe
                      srcDoc={sanitizeContent(current.content, current.script)}
                      sandbox="allow-scripts"
                      className="rounded border"
                      style={{
                        height: iframeHeight[iframeSize],
                        width: iframeWidth[iframeSize],
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl bg-[#0f1117] border border-gray-800 shadow-lg overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800 bg-[#1a1c23]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setShowJsCode((prev) => ({ ...prev, [name]: !prev[name] }))
                        }
                        className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                      >
                        {isJs ? 'HTML' : 'JS'}
                      </button>
                      <div className="relative">
                        <select
                          value={framework}
                          onChange={(e) =>
                            setSelectedFrameworks((prev) => ({
                              ...prev,
                              [name]: e.target.value,
                            }))
                          }
                          className="text-xs pl-7 pr-2 py-1 bg-gray-900 text-white rounded border border-gray-700 appearance-none"
                        >
                          {items.map((item) => (
                            <option key={item.framework} value={item.framework}>
                              {item.framework}
                            </option>
                          ))}
                        </select>
                        <img
                          src={`/images/${fwInfo?.icon || 'default.png'}`}
                          alt=""
                          className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleCopy(isJs ? current.script : current.content)
                      }
                      className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 transition"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="overflow-auto max-h-[500px] p-4">
                    <pre className="text-sm font-mono leading-relaxed text-gray-100 whitespace-pre-wrap">
                      <code className={`language-${isJs ? 'javascript' : 'markup'}`}>
                        {isJs ? current.script : current.content}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </section>
          );
        })}
    </div>
  );
}
