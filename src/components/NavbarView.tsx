'use client';

import { useEffect, useState } from 'react';
import { Code, Monitor } from 'lucide-react';
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

export default function NavbarSectionGroup() {
  const [groupedNavbars, setGroupedNavbars] = useState<Record<string, NavbarData[]>>({});
  const [visibleCode, setVisibleCode] = useState<Record<string, boolean>>({});
  const [selectedFrameworks, setSelectedFrameworks] = useState<Record<string, string>>({});
  const [showJsCode, setShowJsCode] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('http://localhost:3001/api/navbars')
      .then(res => res.json())
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
      });
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [groupedNavbars, visibleCode, showJsCode, selectedFrameworks]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'));
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 space-y-20">
      {Object.entries(groupedNavbars).map(([name, items]) => {
        const framework = selectedFrameworks[name];
        const current = items.find((item) => item.framework === framework);
        const isCode = visibleCode[name];
        const isJs = showJsCode[name];

        if (!current) return null;

        return (
          <section key={name} className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="bg-black text-white px-6 py-3 rounded-full shadow-lg relative">
                <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-yellow-400 text-black text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                  {framework}
                </span>
                <h2 className="font-semibold">{name}</h2>
              </div>

              <div className="inline-flex rounded-3xl bg-gray-300 p-1 shadow-sm">
                <button
                  onClick={() => setVisibleCode((prev) => ({ ...prev, [name]: false }))}
                  className={`flex items-center px-5 py-2 rounded-3xl text-sm font-medium ${!isCode ? 'bg-white text-gray-700' : 'text-gray-700'}`}
                >
                  <Monitor size={16} className="mr-1" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setVisibleCode((prev) => ({ ...prev, [name]: true }))}
                  className={`flex items-center px-5 py-2 rounded-3xl text-sm font-medium ${isCode ? 'bg-white text-gray-700' : 'text-gray-700'}`}
                >
                  <Code size={16} className="mr-1" />
                  <span>Code</span>
                </button>
              </div>
            </div>

            {/* PREVIEW */}
            {!isCode ? (
              <div className="bg-white p-4 shadow-xl rounded-xl preview-container">
                <p className="text-sm text-gray-600 mb-4">
                  Preview in sandbox <strong>Real Time</strong>. Wait a few moments if it doesn't appear.
                </p>
                <iframe
                  srcDoc={current.content}
                  sandbox="allow-scripts"
                  className="w-full"
                />
              </div>
            ) : (
              // CODE
              <div className="bg-gray-950 rounded-xl p-4 shadow-lg border border-gray-800 relative">
                <div className="absolute left-4 top-4 z-10 flex gap-2">
                  <button
                    onClick={() => setShowJsCode((prev) => ({ ...prev, [name]: !prev[name] }))}
                    className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500"
                  >
                    {isJs ? 'HTML' : 'JS'}
                  </button>

                  <select
                    value={framework}
                    onChange={(e) => setSelectedFrameworks((prev) => ({ ...prev, [name]: e.target.value }))}
                    className="text-xs px-3 py-1 bg-gray-800 text-white rounded border border-gray-600"
                  >
                    {items.map((item) => (
                      <option key={item.framework} value={item.framework}>
                        {item.framework}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="absolute right-4 top-4">
                  <button
                    onClick={() => handleCopy(isJs ? current.script : current.content)}
                    className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500"
                  >
                    Copy
                  </button>
                </div>

                <div className="pt-16">
                  <pre className="text-sm overflow-auto font-mono whitespace-pre-wrap min-h-[300px]">
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
