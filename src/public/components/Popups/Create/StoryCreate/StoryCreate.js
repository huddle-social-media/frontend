import Component from "../../../../lib/flux/component/Component.js";
import popupsActions from "../../PopupsActions.js";
import popupsEvents from "../../PopupsEvents.js";

class StoryCreate extends Component{
    constructor(props = {}) {
        super(props);
        this.uploadedImages = [];
        this.uploadedImageIdx = 0;
        this.maxTitle = 60;
    }

    createImgPreviewWindow(key) {
        let dom = new DOMParser();
        let doc = dom.parseFromString(`
        <div id="${key}" style="position: relative; width: 31.2%; height: 150px; background-color: #ffffff;" class="v-border-r-16px v-margin-t-8px v-margin-r-8px">
            <div class="material-icons" style="position: absolute; top: 10px; right: 10px; cursor: pointer; user-select: none;">cancel</div>
            <img style="width: 100%; height: 100%" class="v-border-r-16px">
        </div>
        `, 'text/html');
        return { preview: doc.body.firstChild, img: doc.querySelector('img') };
    }

    onCreate() {
        this.refs.imgUpload.addEventListener('change', event => {
            let fileList = this.refs.imgUpload.files;
            let keys = Object.keys(fileList);
            const allowedTypes = ["image/png", "image/jpeg"];
            if(fileList) {
                keys.forEach(key => {
                    if(allowedTypes.includes(fileList[key].type)) {
                        let reader = new FileReader();
                        reader.addEventListener('load', () => {
                            let preview = this.createImgPreviewWindow(this.uploadedImageIdx);
                            preview.img.setAttribute('src', reader.result);
                            this.refs.previewBox.appendChild(preview.preview);
                            this.uploadedImages[this.uploadedImageIdx++] = fileList[key];
                        });
                        reader.readAsDataURL(fileList[key]);
                    }
                })
            } 
        });

        this.refs.previewBox.addEventListener('click', event => {
            try {
                if(event.target.textContent === "cancel") { 
                    const key = parseInt(event.target.parentElement.getAttribute('id'));
                    if(key >= 0 && this.uploadedImages[key]) {
                        this.uploadedImages[key] = undefined;
                        this.refs.previewBox.removeChild(event.target.parentElement);
                        console.log(this.uploadedImages);
                    }
                }
            }catch(err) {
                window.prompt("err : "+err);
            }
            
        }, true);

        this.refs.closeStoryCreate.addEventListener('click', () => {
            this.dispatch(popupsActions.closePopupWindow(popupsEvents.CLOSE_POPUP_WINDOW));
        });

        this.refs.titleInput.addEventListener('input', () => {
            let typed = this.refs.titleInput.value.length;
            this.refs.titleRemainCount.textContent = this.maxTitle - typed;
        });
    }

    render() {
        return `
        <div class="bg-color-white f-poppins v-border-r-32px" style="scrollbar-width: none; -ms-overflow-style: none; -webkit-scrollbar: none; max-width: 30.5rem; overflow-y: auto; max-height: 41.75rem;">
        <form>
        <div class="bg-color-white v-margin-l-32px v-margin-t-32px v-margin-r-32px v-margin-b-32px" style="display: flex; align-items: center; justify-content: space-between;">
            <div class="t-lg f-w-md t-color-gray">Create Story</div>
            <div class="t-color-gray" style="display: flex; align-items: center;">
                <div class="material-icons v-margin-r-8px" style="cursor: pointer; user-select: none;">send</div>
                <div class="material-icons v-margin-r-8px" style="cursor: pointer; user-select: none;" data-ref="closeStoryCreate">close</div>
            </div>
        </div>
        <div class="bg-color-light-gray t-color-gray" style="border-radius: 0 0 2rem 2rem; padding: 2rem;">
            <div>
                <div style="display: flex; align-items: center; justify-content: space-between;" class="v-margin-b-8px">
                    <div class="t-md f-w-md v-margin-l-16px">Title</div>
                    <div class="t-sm f-w-rg v-margin-r-16px"><span data-ref="titleRemainCount">0</span> of ${this.maxTitle}</div>
                </div>
                <div>
                    <input maxlength="60" data-ref="titleInput" type="text" class="bg-color-white v-border-r-32px v-margin-b-8px text-input" style="resize: none; width: 100%; border: none; outline: none; padding: 1rem; min-height: 4rem;" placeholder="Type your title here...">
                </div>
            </div>
            <div class="v-margin-t-16px">
                <div style="display: flex; align-items: center; justify-content: space-between;" class="v-margin-b-8px">
                    <div class="t-md f-w-md v-margin-l-16px">Add an interest</div>
                    <div class="t-sm f-w-rg v-margin-r-16px"><span>0</span> of 1</div>
                </div>
                <div class="bg-color-white v-border-r-32px" style="flex-flow: row wrap; display: flex; padding: 1rem; height: fit-content; width: 100%;">
                    
                    <div style="display: none !important; display: flex; align-items: center; padding: 0.25rem;" class="bg-color-orange t-color-white v-border-r-32px v-margin-r-8px">
                        <span class="v-margin-r-4px">Cricket</span>
                        <div class="material-icons">remove_circle</div>
                    </div>
                    
                    <input style="outline: none; border: none; background-color: transparent; max-width: fit-content; min-width: 2rem;" type="text" placeholder="Type your interest here..." class="text-input t-md">    
                </div>
            </div>
            <div class="v-margin-t-16px">
                <div class="t-md f-w-md v-margin-l-16px" style="display: flex; align-items: center;">Multimedia 
                <label class="material-icons v-margin-l-8px" style="cursor: pointer;" for="img-upload">add_a_photo</label>
                
                <input multiple="multiple" accept="image/png, image/jpeg" type="file" id="img-upload" data-ref="imgUpload" style="display: none; visibility: none;">
                
                </div>
                <div style="display: flex; flex-wrap: wrap" data-ref="previewBox">
                    <!-- area for uploading images -->
                    
                </div>
            </div>
        </div>
        </form>
    </div>
        `
    }
}

export default StoryCreate;