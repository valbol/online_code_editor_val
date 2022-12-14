import './code-editor.css';
import './syntax.css';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import { useRef } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Higlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, MonacoEditor) => {
    editorRef.current = MonacoEditor;
    MonacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    MonacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Higlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      MonacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const onFormatClick = () => {
    //get current value from editor
    const unformatted = editorRef.current.getModel().getValue();
    // format the value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };
  // ! we can useRet to use for any arbitrary value inside our component
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        language="javascript"
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
