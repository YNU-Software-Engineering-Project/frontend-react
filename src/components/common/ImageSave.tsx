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
    
        if (imageLists) {  // imageLists가 null이 아닌 경우에만 처리
            let imageUrlLists = [...showImages];
    
            for (let i = 0; i < imageLists.length; i++) {
                const currentImageUrl = URL.createObjectURL(imageLists[i]);
                imageUrlLists.push(currentImageUrl);
            }
            if (imageUrlLists.length > maxImageCount) {
                imageUrlLists = imageUrlLists.slice(0, maxImageCount);
            }
            setShowImages(imageUrlLists);
        }
    };
    useEffect(() => {
        onImagesChange(showImages); // 이미지 URL이 변경될 때마다 호출
    }, [showImages, onImagesChange]);

    // X버튼 클릭 시 이미지 삭제
    const handleDeleteImage = (id: number) => {
      setShowImages(showImages.filter((_, index) => index !== id));
    };
  
    return (
        <div className="addPicture" style={{display:'gird'}}>
            <label htmlFor="input-file" className="addButton" style={{maxWidth:'73px',display:'grid', padding:'10px 0', fontFamily:'GmarketSans'}}>
                <input type="file" id="input-file" multiple className="addButton" onChange={handleAddImages} style={{width:'73px'}}/>
            </label>
            <div style={{display:'flex', flexWrap:'wrap', gap:'20px'}}>
                {showImages.map((image, id) => (
                    <div className="imageContainer" key={id} style={{position:'relative', display:'grid'}}>
                        <button style={{padding:'0',position:'absolute', border:'none', backgroundColor:'transparent', left:'100%'}} onClick={() => handleDeleteImage(id)}>x</button>
                        <img src={image} alt={`${image}-${id}`}  style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSave;