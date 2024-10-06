import { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import types from '@toast-ui/editor/types';

type TuiViewerProps = {
  content: string;
};

const TuiViewer: React.FC<TuiViewerProps> = ({ content }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!viewerRef.current) return;
    const viewer = new Viewer({
      el: viewerRef.current,
      initialValue: content,
    });

    // 컴포넌트가 unmount 될 때 에디터를 파기
    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <>
      <div ref={viewerRef} />
    </>
  );
};

export default TuiViewer;
