import { Editor } from '@toast-ui/editor';
import { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css'; // 스타일 추가
import '@toast-ui/editor/dist/toastui-editor.css';

const ToastUi =()=>{
    useEffect(() => {
        const editor = new Editor({
          el: document.querySelector('#editor') as HTMLElement, // 에디터를 적용할 요소
          height: '500px', // 에디터 영역의 높이 값
          initialEditType: 'wysiwyg', // 최초로 보여줄 에디터 타입
          initialValue: '내용을 입력해 주세요.', // 초기 값
          previewStyle: 'vertical', // 마크다운 프리뷰 스타일
          hooks: {
            async addImageBlobHook(blob, callback) { // 이미지 업로드 로직 커스텀
                try {
                    const formData = new FormData();
                    formData.append('image', blob);

                    const response = await fetch('/tui-editor/image-upload', {
                        method : 'POST',
                        body : formData,
                    });

                    const filename = await response.text();
                    console.log('서버에 저장된 파일명 : ', filename);

                    const imageUrl = `/tui-editor/image-print?filename=${filename}`;
                    callback(imageUrl, 'image alt attribute');

                } catch (error) {
                    console.error('업로드 실패 : ', error);
                }
            }
        }
        /* end of hooks */
    });
    
        // 컴포넌트가 unmount 될 때 에디터를 파기
        return () => {
          editor.destroy();
        };
    }, []);
    return (
        <div id="editor" />
    );
}
export default ToastUi