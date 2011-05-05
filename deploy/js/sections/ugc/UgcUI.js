var UgcUI = function ( shared ) {

	var css = [
		'#ugcui g {',
		'  cursor: pointer;',
		'}',
		'#ugcui g.menu polygon.hitbox {',
		'  display: none;',
		'}',
		'#ugcui g.menu:hover polygon.hitbox {',
		'  display: inherit;',
		'}',
		'#ugcui g.folder polygon.folder-hitbox {',
		'  display: none;',
		'}',
		'#ugcui g.folder:hover polygon.folder-hitbox {',
		'  display: inherit;',
		'}',
		'#ugcui g.menu g.menu-buttons {',
		'  display: none;',
		'}',
		'#ugcui g.menu:hover g.menu-buttons {',
		'  display: block;',
		'}',
		'#ugcui g.active polygon.hex {',
		'  fill: #f65824;',
		'}',
		'#ugcui g#color g.options polygon.selected {',
		'  stroke: #fff;',
		'  stroke-width: 3.5;',
		'}',
		'#ugcui g#color g.options polygon#white.selected {',
		'  stroke: #000;',
		'}',
		'#ugcui g#color g.options polygon:not(.selected):hover {',
		'  stroke: #fff;',
		'  stroke-width: 3.5;',
		'}',
		'#ugcui g#color g.options polygon#white:not(.selected):hover {',
		'  stroke: #000;',
		'}',
		'#ugcui g.menu-buttons g:hover:not(.active) .hex {',
		'  fill: #fff;',
		'}',
		'#ugcui g.folder g.options {',
		'  display: none;',
		'}',
		'#ugcui g.folder:hover g.options {',
		'  display: block;',
		'}',
		'#ugcui g#size g g:hover polygon.bg {',
		'  fill: #fff;',
		'}',
		'#ugcui g#size:hover g g polygon.bg.active {',
		'  fill: #f65824;',
		'}',
		'#ugcui g#smoother g.options g:hover polygon.bg {',
		'  fill: #fff;',
		'}'
	].join("\n");

	var svg = [
		'<svg id="ugcui" ',
		'		version="1.1"',
		'     xmlns="http://www.w3.org/2000/svg"',
		'     xmlns:xlink="http://www.w3.org/1999/xlink"',
		'     xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"',
		'  	 width="1200px" ',
		'  	 height="1200px"><g>',
		'<g class="menu">',
		'',
		'<polygon class="hex main" fill="#282828"',
		'         points="13.128,45.47 0.002,22.735 13.128,0 39.379,0 52.505,22.735 39.379,45.47 "></polygon>',
		'',
		'<polygon fill="#ED957A"',
		'         points="26.747,35.233 15.912,28.403 15.912,15.66 26.747,22.488 	"></polygon>',
		'<polygon fill="#EA7B59"',
		'         points="37.583,15.66 26.747,22.49 26.747,35.233 37.583,28.405 	"></polygon>',
		'<polygon fill="#F15C22"',
		'         points="15.912,15.66 26.75,22.49 37.583,15.66 26.75,9.119 	"></polygon>',
		'',
		'<polygon opacity="0" class="hitbox" points="140.184,',
		'    72.916 126.007,48.362 98.374,48.362 84.558,24.432 56.924,24.432',
		'	43.107,0.5 14.756,0.5 0.58,25.054 14.397,48.985 0.58,72.917 14.397,96.847 0.58,120.779 14.756,145.332 42.389,145.332',
		'	56.206,169.263 84.556,169.263 98.373,145.332 126.007,145.332 140.184,120.778 126.366,96.847 "></polygon>',
		'',
		'<g class="menu-buttons">',
		'',
		'<g id="reflect" class="toggle">',
		'',
		'  <polygon class="hex" fill="rgba(255, 255, 255,',
		'      0.4)" points="13.128,',
		'      93.332 0.002,70.598 13.128,47.862 39.379,47.862 52.505,70.598',
		'39.379,93.332 "></polygon>',
		'',
		'',
		'  <rect x="16.502" y="58.113" fill="none" width="20.022" height="25.86"></rect>',
		'  <path fill="#30302E" d="M33.981,70.986c0,3.275-2.654,5.931-5.929,5.931v2.542c4.679,0,8.472-3.791,8.472-8.473',
		'		c0-4.679-3.793-8.47-8.472-8.47v2.539C31.327,65.055,33.981,67.711,33.981,70.986"></path>',
		'  <path fill="#30302E" d="M19.047,71.023c0,3.277,2.653,5.934,5.928,5.934v2.539c-4.679,0-8.473-3.792-8.473-8.473',
		'		c0-4.679,3.794-8.47,8.473-8.47v2.539C21.7,65.092,19.047,67.749,19.047,71.023"></path>',
		'  <rect x="26.256" y="58.113" fill="#30302E" width="0.409" height="25.86"></rect>',
		'</g>',
		'',
		'<g id="create" class="active">',
		'  <polygon class="hex" fill="rgba(255, 255, 255,',
		'      0.4)" points="54.578,',
		'      69.401 41.452,46.666 54.578,23.932 80.83,23.932 93.956,46.666',
		'	80.829,69.401 "></polygon>',
		'',
		'  <polygon fill="#575759"',
		'           points="68.083,46.957 57.056,40.275 57.056,53.489 68.083,60.169 	"></polygon>',
		'  <polyline fill="#3A3A3A"',
		'            points="68.083,46.957 79.109,40.275 79.109,53.489 68.083,60.169 	"></polyline>',
		'  <polygon fill="#282828"',
		'           points="57.055,40.276 68.083,47.078 79.111,40.276 68.083,33.906 	"></polygon>',
		'</g>',
		'',
		'<g id="erase">',
		'',
		'  <polygon class="hex" fill="rgba(255, 255, 255, 0.4)" points="96.028,',
		'  93.332 82.902,',
		'  70.598 96.028,47.862 122.279,47.862 135.406,70.597',
		'	122.279,93.332 "></polygon>',
		'',
		'  <path d="M108.854,78.1l9.885-9.884c0.91-0.911,0.911-2.392,0-3.303l-5.394-5.393c-0.91-0.911-2.393-0.912-3.303-0.001l-9.885,9.884',
		'		c-0.911,0.91-0.909,2.393,0.001,3.303l5.393,5.393C106.463,79.01,107.944,79.01,108.854,78.1z M101.053,70.298l4.929-4.929',
		'		l6.906,6.905l-4.929,4.93c-0.417,0.417-1.096,0.418-1.513,0.001l-5.394-5.393C100.636,71.396,100.636,70.716,101.053,70.298z"></path>',
		'  <path d="M118.765,69.096l-0.894,0.894c0.417,0.417,0.416,1.095-0.001,1.513l-9.885,9.884c-0.417,0.417-1.095,0.418-1.512,0.001',
		'		l-5.396-5.396c-0.416-0.416-0.415-1.094,0.003-1.512l-0.896-0.896c-0.91,0.911-0.91,2.392-0.001,3.301l5.396,5.396',
		'		c0.91,0.91,2.392,0.911,3.302,0l9.884-9.884C119.676,71.487,119.675,70.006,118.765,69.096z"></path>',
		'</g>',
		'',
		'<g id="undo">',
		'  <polygon class="hex" fill="rgba(255, 255, 255, 0.4)" points="54.578,',
		'  117.263 41.452,',
		'  94.528 54.578,71.794 80.829,71.794 93.955,94.528',
		'	80.829,117.263 "></polygon>',
		'',
		'  <path d="M66.275,85.886l-7.204,4.949l6.685,6.087l0.173-3.677c0,0,4.647-0.105,6.306,3.98c1.648,4.086,0.378,7.234,0.378,7.234',
		'		s4.24-1.563,2.989-8.994c0,0-1.088-5.905-9.485-6.221L66.275,85.886z"></path>',
		'</g>',
		'',
		'<g class="folder" id="size">',
		'',
		'  <polygon opacity="0" class="folder-hitbox" fill="#FFFFFF"',
		'           stroke="#000000"',
		'           points="126.366,',
		'144.709 140.184,120.778 126.007,96.225 97.656,96.225 83.48,120.779',
		'	97.297,144.71 83.48,168.642 97.297,192.572 83.479,216.504 97.655,241.057 126.006,241.057 140.182,216.504 126.366,192.573',
		'	140.183,168.642 "></polygon>',
		'',
		'  <g class="size" id="icon-size-small">',
		'    <g>',
		'      <polygon class="active bg" fill="rgba(255, 255, 255, 0.4)" points="96.028,',
		'  141.194 82.902,',
		'  118.46 96.028,95.725 122.279,95.725 135.406,118.459',
		'	122.279,141.194 "></polygon>',
		'',
		'',
		'      <line fill="none" stroke="#3D3D3D" stroke-width="0.5"',
		'            stroke-miterlimit="10" x1="98.111" y1="118.646" x2="114.651"',
		'            y2="128.775"></line>',
		'      <line fill="none" stroke="#3D3D3D" stroke-width="0.5"',
		'            stroke-miterlimit="10" x1="103.624" y1="115.244" x2="120.165"',
		'            y2="125.374"></line>',
		'      <line fill="none" stroke="#3D3D3D" stroke-width="0.5"',
		'            stroke-miterlimit="10" x1="114.651" y1="115.172" x2="98.11"',
		'            y2="125.375"></line>',
		'      <line fill="none" stroke="#3D3D3D" stroke-width="0.5"',
		'            stroke-miterlimit="10" x1="120.165" y1="118.646" x2="103.624"',
		'            y2="128.776"></line>',
		'      <polygon fill="none" stroke="#3D3D3D" stroke-width="0.5"',
		'               stroke-miterlimit="10" points="92.598,121.974 109.138,132.25',
		'		125.679,121.974 109.138,112.161 	"></polygon>',
		'      <polygon fill="#575759"',
		'               points="109.138,118.646 103.624,115.171 103.624,108.687 109.138,112.161 	"></polygon>',
		'      <polygon fill="#3A3A3A"',
		'               points="114.651,108.687 109.138,112.161 109.138,118.646 114.651,115.171 	"></polygon>',
		'      <polygon fill="#282828"',
		'               points="103.624,108.687 109.139,112.161 114.651,108.687 109.139,105.358 	"></polygon>',
		'    </g>',
		'  </g>',
		'',
		'  <g class="options">',
		'',
		'    <g class="size" id="icon-size-med">',
		'      <!-- Hex -->',
		'      <polygon class="bg" fill="rgba(255, 255, 255, 0.4)"',
		'               points="96.028,189.057 82.902,166.323 96.028,143.588 122.28,143.588 135.405,166.323 122.279,189.057 "></polygon>',
		'',
		'      <!-- Med icon -->',
		'      <polygon fill="#E0E0E0"',
		'               points="98.111,169.571 103.625,173.047 109.138,169.571 103.625,166.243 	"></polygon>',
		'      <polygon fill="#E0E0E0"',
		'               points="109.138,169.572 114.652,173.048 120.165,169.572 114.652,166.244 	"></polygon>',
		'      <polygon fill="#E0E0E0"',
		'               points="103.624,172.974 109.139,176.448 114.651,172.974 109.139,169.646 	"></polygon>',
		'',
		'      <line fill="none" stroke="#3D3D3D" stroke-width="0.5"',
		'            stroke-miterlimit="10"',
		'            x1="98.111" y1="169.646" x2="114.651" y2="179.775"></line>',
		'',
		'      <line fill="none" stroke="#3D3D3D" stroke-width="0.5"',
		'            stroke-miterlimit="10"',
		'            x1="103.624" y1="166.244" x2="120.165" y2="176.374"></line>',
		'',
		'      <line fill="none" stroke="#3D3D3D" stroke-width="0.5"',
		'            stroke-miterlimit="10"',
		'            x1="114.651" y1="166.172" x2="98.11" y2="176.375"></line>',
		'',
		'      <line fill="none" stroke="#3D3D3D" stroke-width="0.5"',
		'            stroke-miterlimit="10"',
		'            x1="120.165" y1="169.646" x2="103.624" y2="179.776"></line>',
		'      <polygon fill="none" stroke="#3D3D3D" stroke-width="0.5"',
		'               stroke-miterlimit="10" points="92.598,172.974 109.138,183.25',
		'		125.679,172.974 109.138,163.161 	"></polygon>',
		'      <polygon fill="#575759"',
		'               points="109.084,162.956 98.057,156.275 98.057,169.489 109.084,176.169 	"></polygon>',
		'      <polyline fill="#3A3A3A"',
		'                points="109.084,162.956 120.109,156.275 120.109,169.489 109.084,176.169 	"></polyline>',
		'      <polygon fill="#282828"',
		'               points="98.055,156.276 109.082,163.077 120.111,156.276 109.082,149.905 	"></polygon>',
		'    </g>',
		'',
		'    <g class="size" id="icon-size-large">',
		'      <!-- Hex -->',
		'      <polygon class="bg" fill="rgba(255, 255, 255, 0.4)"',
		'               points="96.027,236.919 82.901,214.186 96.027,191.451 122.279,191.451 135.404,214.186 122.278,236.919 "></polygon>',
		'      <!-- Big icon -->',
		'      <polygon fill="#575759"',
		'               points="108.709,215.198 91.668,204.448 91.668,224.007 108.709,234.359 	"></polygon>',
		'      <polygon fill="#3A3A3A"',
		'               points="125.75,224.024 108.709,234.358 108.709,215.217 125.75,204.864 	"></polygon>',
		'      <polygon fill="#282828"',
		'               points="125.75,204.864 108.584,215.198 91.668,204.448 108.709,195.198 	"></polygon>',
		'    </g>',
		'',
		'  </g>',
		'',
		'</g>',
		'',
		'<g class="folder" id="smoother">',
		'',
		'  <!--hex -->',
		'  <polygon class="hex" fill="rgba(255, 255, 255, 0.4)" points="54.578,',
		'  165.125 41.452,',
		'  142.391 54.578,119.657 80.829,119.657 93.955,142.391',
		'	80.829,165.125 "></polygon>',
		'',
		'  <!--icon-->',
		'  <polygon fill="#575759"',
		'           points="68.279,159.028 62.1,155.134 62.1,147.868 68.279,151.761 	"></polygon>',
		'  <polygon fill="#3A3A3A"',
		'           points="74.458,147.868 68.279,151.762 68.279,159.028 74.458,155.135 	"></polygon>',
		'  <polygon fill="#282828"',
		'           points="62.1,147.868 68.28,151.762 74.458,147.868 68.28,144.138 	"></polygon>',
		'  <circle fill="#575759" cx="68.167" cy="134.167" r="5"></circle>',
		'  <polygon opacity="0" class="folder-hitbox" fill="#FFFFFF"',
		'           stroke="#000000"',
		'           points="84.916,',
		'168.64 98.732,',
		'144.71 84.556,120.157 56.206,120.157 42.029,144.71',
		'	55.847,168.641 42.029,192.573 55.846,216.503 42.029,240.435 56.206,264.988 84.556,264.988 98.732,240.435 84.916,216.503',
		'	98.732,192.573 "></polygon>',
		'',
		'  <g class="options">',
		'',
		'    <g id="smoother-up">',
		'      <polygon class="bg" fill="rgba(255, 255, 255, 0.4)"',
		'               points="54.578,212.988 41.452,190.254 54.578,167.519 80.829,167.519 93.955,190.254 80.829,212.988 "></polygon>',
		'    </g>',
		'',
		'    <g id="smoother-down">',
		'      <polygon class="bg" fill="rgba(255, 255, 255, 0.4)"',
		'               points="54.578,260.85 41.452,238.116 54.578,215.381 80.829,215.381 93.955,238.116 80.829,260.85 "></polygon>',
		'    </g>',
		'  </g>',
		'',
		'</g>',
		'',
		'<g class="folder" id="color">',
		'',
		'  <polygon class="hex" fill="rgba(255, 255, 255, 0.4)" points="13.128,',
		'  141.194 0.002,',
		'  118.46 13.128,95.725 39.379,95.725 52.505,118.46',
		'	39.379,141.194 "></polygon>',
		'',
		'  <!-- Paint Bucket -->',
		'  <path d="M36.365,110.268c0-1.864-4.349-3.374-9.715-3.374c-5.369,0-9.718,1.511-9.718,3.371c0,0.145,0.035,0.287,0.087,0.427',
		'		v16.067l0.327,0.196c0.153,0.092,3.805,2.25,9.184,2.25c5.368,0,9.243-2.148,9.405-2.24l0.343-0.193v-16.079',
		'		C36.331,110.555,36.365,110.413,36.365,110.268z M26.65,108.149c4.15,0,7.517,1.067,7.517,2.382c0,1.315-3.366,2.387-7.517,2.387',
		'		c-4.155,0-7.518-1.072-7.518-2.387C19.132,109.216,22.495,108.149,26.65,108.149z M26.53,127.859c-4.109,0-7.188-1.383-8.164-1.881',
		'		V112.01c0.157,0.088,0.321,0.175,0.499,0.257v0.206c0,0,1.344,0.289,1.405,1.64c0.054,1.345-0.235,3.629,0.762,3.629',
		'		c0.991,0,0.521-3.629,0.521-3.629s0.614-0.529,2.051,0c1.116,0.412,2.811,0.999,3.046,2.28c-0.059,1.53,0,2.813,0,2.813',
		'		s0.032,1.114,0.495,1.114c0.464,0,0.554,0.062,0.732-0.406c0.175-0.468,0.35-4.159,0.35-4.159s-0.021-0.681,0.354-1.053',
		'		c0.375-0.379,1.149-0.443,1.112,0.643c-0.059,1.582,0,5.558,0,5.558s-0.233,1.055,0.645,1.118c0.878,0.054,0.762-1.29,0.762-1.29',
		'		l0.004-5.208c0,0-0.29-1.503,3.827-3.015v13.458C33.901,126.466,30.655,127.859,26.53,127.859z"></path>',
		'',
		'  <polygon opacity="0" class="folder-hitbox" fill="#FFFFFF"',
		'           stroke="#000000"',
		'           points="140.182,',
		'        216.504 126.007,',
		'191.951 98.373,191.951 84.557,168.019 56.923,168.019',
		'	43.466,144.709 57.283,120.779 43.107,96.225 14.756,96.225 0.58,120.779 14.396,144.709 0.579,168.642 14.396,192.572',
		'	0.579,216.505 14.396,240.435 0.578,264.368 14.395,288.298 0.578,312.232 14.754,336.784 43.104,336.784 56.924,312.85',
		'	84.557,312.85 98.373,288.919 126.006,288.919 140.182,264.367 126.365,240.434 "></polygon>',
		'  <g class="options">',
		'    <polygon fill="#80C5D8"',
		'             points="54.578,212.988 41.452,190.254 54.578,167.519 80.829,167.519 93.955,190.254 80.829,212.988 	"></polygon>',
		'',
		'    <polygon fill="#2EA8CE" points="96.027,236.919 82.901,214.186 96.027,191.451 122.279,191.451 135.404,214.186 122.278,236.919',
		'		"></polygon>',
		'',
		'    <polygon fill="#3F2249" points="96.027,284.782 82.901,262.048 96.027,239.313 122.279,239.313 135.404,262.048 122.278,284.782',
		'		"></polygon>',
		'',
		'    <polygon fill="#EF7B1B"',
		'             points="54.578,260.85 41.452,238.116 54.578,215.381 80.829,215.381 93.955,238.116 80.829,260.85 	"></polygon>',
		'',
		'    <polygon fill="#FF066C"',
		'             points="54.578,308.713 41.452,285.979 54.578,263.244 80.829,263.244 93.954,285.979 80.829,308.713 	"></polygon>',
		'',
		'    <polygon fill="#FFF200"',
		'             points="13.126,332.646 0,309.913 13.126,287.176 39.377,287.176 52.503,309.913 39.377,332.646 	"></polygon>',
		'',
		'    <polygon id="white" class="selected" fill="#FFFFFF"',
		'             points="13.127,189.057 0.001,166.323 13.127,143.588 39.379,143.588 52.504,166.323 39.378,189.057 	"></polygon>',
		'',
		'    <polygon fill="#DBCE9A"',
		'             points="13.127,236.92 0.001,214.186 13.127,191.451 39.378,191.451 52.504,214.186 39.378,236.92 	"></polygon>',
		'',
		'    <polygon fill="#458C65"',
		'             points="13.126,284.783 0,262.049 13.126,239.313 39.378,239.313 52.503,262.049 39.377,284.783 	"></polygon>',
		'  </g>',
		'</g>',
		'',
		'</g>',
		'',
		'</g>',
		'',
		'',
		'<g class="menu">',
		'  <polygon fill="#282828" points="13.128,508.477 0.002,485.742 13.128,',
		'  463.007 39.379,463.007 52.505,485.742',
		'  39.379,508.477 "></polygon>',
		'  <polygon opacity="0" class="hitbox" fill="#FFFFFF" stroke="#000000"',
		'           points="98.732,',
		'    464.13 84.556,',
		'  439.577 56.924,439.577 43.106,415.645 14.756,415.645',
		'  0.58,440.199 14.396,464.129 0.58,488.061 14.756,512.614 42.388,512.614 56.206,536.545 84.556,536.545 98.732,511.993',
		'  84.916,488.061 "></polygon>',
		'',
		'  <g class="menu-buttons">',
		'',
		'    <g class="active" id="life">',
		'',
		'      <polygon class="hex" fill="rgba(255, 255, 255, 0.4)" points="54.578,',
		'    484.546 41.452,461.812 54.578,439.076 80.829,439.076 93.955,461.812',
		'  80.829,484.546 "></polygon>',
		'',
		'    </g>',
		'',
		'    <g id="dark">',
		'',
		'      <polygon class="hex" fill="rgba(255, 255, 255, 0.4)" points="54.578,',
		'    532.408 41.452,509.674 54.578,486.938 80.829,486.938 93.955,509.674',
		'  80.829,532.408 "></polygon>',
		'',
		'    </g>',
		'',
		'    <polygon class="hex" fill="rgba(255, 255, 255, 0.4)" points="13.128,',
		'    460.614 0.002,',
		'    437.88 13.128,415.145 39.379,415.145 52.505,437.88',
		'  39.379,460.614 "></polygon>',
		'',
		'',
		'    <text id="capacity" x="27" y="438" text-anchor="middle"',
		'          font-family="Gotham Bold"',
		'          font-size="11" dominant-baseline="middle"',
		'          fill="#000">',
		'    </text>',
		'  </g>',
		'</g>',
		'</g>',
		'',
		'</svg>'].join("\n");

	var sheet = document.createElement('style');
	sheet.setAttribute('type', 'text/css');
	sheet.innerHTML = css;
	document.getElementsByTagName('head')[0].appendChild(sheet);

	var div = document.createElement('div');
	div.innerHTML = svg;

	var HANDLERS = {

		updateCapacity: function (i) {

			document.getElementById('capacity').textContent = ( Math.round( i * 100 ) + '%' );

		},

		oncreatemode: function () {

			

		},

		onerasemode: function () {

			

		},

		onreflectmode: function ( bool ) {

			

		},

		onundo: function () {

			alert('saved');
			shared.ugcSignals.submit.dispatch();

		},

		oncolorchange: function ( hex ) {

			shared.ugcSignals.object_changecolor.dispatch( hex );

		},

		onsmoothup: function () {

			

		},

		onsmoothdown: function() {

			

		},

		// 0 = smallest, 1 = med, 2 = largest
		onsize: function ( size ) {

			

		},

		onlife: function () {

			

		},

		ondark: function () {

			

		}

 	};

	this.__defineGetter__('HANDLERS', function() {
		return HANDLERS;
	});

	var onClick = function(id, fnc) {
		if (typeof id == 'string') {
			var elem = document.getElementById(id);
		} else { 
			var elem = id;
		}
		elem.addEventListener('mouseup', fnc, false);
	}

	var findBG = function(containerId) {

		var c = document.getElementById(containerId);
		return c.getElementsByClassName('bg')[0];

	};

	this.addListeners = function() {

		onClick('create', function() {
		  this.setAttribute('class', 'active');
		  document.getElementById('erase').setAttribute('class', '');
		  HANDLERS.oncreatemode();
		});
	
		onClick('erase', function() {
		  this.setAttribute('class', 'active');
		  document.getElementById('create').setAttribute('class', '');
		  HANDLERS.onerasemode();
		});
	
		onClick('life', function() {
		  this.setAttribute('class', 'active');
		  document.getElementById('dark').setAttribute('class', '');
		  HANDLERS.onlife();
		});
	
		onClick('dark', function() {
		  this.setAttribute('class', 'active');
		  document.getElementById('life').setAttribute('class', '');
		  HANDLERS.ondark();
		});
	
		onClick('reflect', function() {
		  if (this.getAttribute('class') == 'toggle') {
			this.setAttribute('class', 'toggle active');
			console.log(this);
			HANDLERS.onreflectmode(true);
		  } else {
			this.setAttribute('class', 'toggle');
			HANDLERS.onreflectmode(false);
		  }
		});
	
		onClick('undo', HANDLERS.onundo);
	
		var colorOptions = document.getElementById('color').getElementsByClassName('options')[0].getElementsByTagName('polygon');
		
		for (var i = 0; i < colorOptions.length; i++) {

			onClick(colorOptions[i], function() {

			  var hex = parseInt( this.getAttribute( 'fill' ).substr( 1 ), 16 );

			  for (var j = 0; j < colorOptions.length; j++) {
			  	colorOptions[j].setAttribute('class', '');
			  }

			  this.setAttribute('class', 'selected');

			  HANDLERS.oncolorchange( hex );

			});
		}
	
		onClick('smoother-up', HANDLERS.onsmoothup);
		onClick('smoother-down', HANDLERS.onsmoothdown);
	
	
		var iconSizeClearActive = function() {
		  findBG('icon-size-small').setAttribute('class', 'bg');
		  findBG('icon-size-med').setAttribute('class', 'bg');
		  findBG('icon-size-large').setAttribute('class', 'bg');
		}
	
		onClick('icon-size-small', function() {
		  iconSizeClearActive();
		  findBG('icon-size-small').setAttribute('class', 'active bg');
		  HANDLERS.onsize(0);
		});
	
		onClick('icon-size-med', function() {
		  iconSizeClearActive();
		  findBG('icon-size-med').setAttribute('class', 'active bg');
		  HANDLERS.onsize(1);
		});
	
		onClick('icon-size-large', function() {
		  iconSizeClearActive();
		  findBG('icon-size-large').setAttribute('class', 'active bg');
		  HANDLERS.onsize(2);
		});
	
	
    };

	this.scale = function(s) {

		div.firstChild.firstChild.setAttribute('transform', 'scale('+s+')');

	};

	this.getDomElement = function () {
		return div;
	}

}
	
