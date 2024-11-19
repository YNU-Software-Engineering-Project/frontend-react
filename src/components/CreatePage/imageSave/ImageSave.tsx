import { useEffect, useState } from "react";

interface ImageSaveProps {
    maxImageCount: number;
    onImagesChange: (imageUrls: string[]) => void; // 이미지 URL 변경시 호출할 콜백
}

const ImageSave = ({ maxImageCount, onImagesChange }: ImageSaveProps) => {
    const [showImages, setShowImages] = useState<string[]>([]);

    // 이미지 상대경로 저장
    const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
        const imageLists = event.target.files;

        if (imageLists) {
            let imageUrlLists = [...showImages];

            for (let i = 0; i < imageLists.length; i++) {
                // 이미지 파일의 URL 생성
                const currentImageUrl = URL.createObjectURL(imageLists[i]);
                imageUrlLists.push(currentImageUrl);
            }

            if (imageUrlLists.length > maxImageCount) {
                imageUrlLists = imageUrlLists.slice(0, maxImageCount);
            }

            setShowImages(imageUrlLists);

            // 업데이트 이후 이미지 콜백 호출
            onImagesChange(imageUrlLists);

            // input 값 초기화 (동일한 파일을 다시 추가할 수 있도록)
            event.target.value = "";
        }
    };

    useEffect(() => {
        // 이미지 URL 변경 시 onImagesChange 콜백 호출
        onImagesChange(showImages);
    }, [showImages, onImagesChange]);

    // X버튼 클릭 시 이미지 삭제
    const handleDeleteImage = (id: number) => {
        // 이미지 URL 해제하여 메모리 누수 방지
        URL.revokeObjectURL(showImages[id]);

        const updatedImages = showImages.filter((_, index) => index !== id);
        setShowImages(updatedImages);

        // 이미지 삭제 이후 콜백 호출
        onImagesChange(updatedImages);
    };

    return (
        <div className="addPicture" style={{ display: 'grid' }}>
            <label htmlFor="input-file" className="addButton" style={{ maxWidth: '73px', display: 'grid', padding: '10px 0' }}>
                <div className="addButton" style={{ borderRadius: '8px', backgroundColor: '#D9D9D9', alignSelf: 'center', justifySelf: 'center', padding: '0 5px', fontSize: '14px' }}>사진 선택</div>
            </label>
            <input
                type="file"
                id="input-file"
                multiple
                className="addButton"
                onChange={handleAddImages}
                style={{ display: 'none' }}
                accept="image/*"
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {showImages.map((image, id) => (
                    <div className="imageContainer" key={id} style={{ position: 'relative', display: 'grid' }}>
                        <button
                            style={{ padding: '0', position: 'absolute', border: 'none', backgroundColor: 'transparent', left: '100%' }}
                            onClick={() => handleDeleteImage(id)}
                        >
                            x
                        </button>
                        <img
                            src={image}
                            alt={`이미지-${id}`}
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSave;
