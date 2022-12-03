import { useEffect } from 'react';
import { useRef } from 'react';

import './preview.css';

interface PreviewProps {
  code: string;
  bundlingStatus: string;
}

const html = `
<html>
  <head>
  <style>html {background-color: white;}</style>
  </head>
  <body>
    <div id="root">
      <script>
      const handleError = (err) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color:red;"><h4>Runtime Error</h4>' + err + '</div>'
        console.error(err);
      }
      window.addEventListener('error',(event)=> {
        event.preventDefault()
        handleError(event.error);
      });
      window.addEventListener('message',(event) => { 
        try {
          eval(event.data);
        } catch(err) {
          handleError(err);
        }
      },false);
      </script>
    </div>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    // ! we set a delay here because the iframe cant set the listener immediately, it pass it and we miss the rendering to the iframe
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        title="code-preview"
      />
      {bundlingStatus && <div className="preview-err">{bundlingStatus}</div>}
    </div>
  );
};

export default Preview;
