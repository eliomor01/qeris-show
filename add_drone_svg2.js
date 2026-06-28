const fs = require('fs');
const path = 'technology.html';
let html = fs.readFileSync(path, 'utf8');

// The anchor: the last text element in SVG 2 legend, followed by </svg>
// We insert new elements between the closing text tag and </svg>
const anchor = '<text x="178" y="245.5" fill="rgba(143,164,180,0.82)" font-size="4" font-family="Space Grotesk,sans-serif">EO/IR cameras</text>\n              </svg>';

if (!html.includes(anchor)) {
  console.error('ERROR: anchor string not found — check formatting');
  process.exit(1);
}

const insertion = `<text x="178" y="245.5" fill="rgba(143,164,180,0.82)" font-size="4" font-family="Space Grotesk,sans-serif">EO/IR cameras</text>
                <!-- Attacking drone inbound from bottom-left -->
                <g>
                  <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.85;0.91;0.98;1" dur="6s" repeatCount="indefinite"/>
                  <circle r="2.8" fill="#ff2020">
                    <animate attributeName="cx" values="8;57;88;88;8" keyTimes="0;0.44;0.72;0.85;1" dur="6s" repeatCount="indefinite"/>
                    <animate attributeName="cy" values="244;185;152;152;244" keyTimes="0;0.44;0.72;0.85;1" dur="6s" repeatCount="indefinite"/>
                    <animate attributeName="r" values="2.8;3.6;2.8" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                </g>
                <!-- Detection cone from bottom EO/IR camera (appears when drone hits outer ring) -->
                <g>
                  <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.42;0.46;0.85;0.91;1" dur="6s" repeatCount="indefinite"/>
                  <path d="M 120 130 L 19 174 L 78 232 Z" fill="rgba(255,20,20,0.14)" stroke="none"/>
                  <line x1="120" y1="130" x2="19" y2="174" stroke="#ff3030" stroke-width="1.2" stroke-linecap="round"/>
                  <line x1="120" y1="130" x2="78" y2="232" stroke="#ff3030" stroke-width="1.2" stroke-linecap="round"/>
                </g>
              </svg>`;

const count = (html.match(new RegExp(anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
console.log(`Matches found: ${count}`);

if (count !== 1) {
  console.error('ERROR: expected exactly 1 match, got ' + count);
  process.exit(1);
}

html = html.replace(anchor, insertion);
fs.writeFileSync(path, html, 'utf8');
console.log('Done — drone animation and detection cone added to SVG 2');
