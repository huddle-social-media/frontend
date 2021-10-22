import Component from "../../component/Component.js";
import { SELECT_NEW_SECTION } from "../../sidebar/SidebarEvents.js";

class Ads extends Component {
    constructor(props = {}){
        super(props);
        this.render = this.render.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.setSubscriber("ads", this.subscriber);
    }

    subscriber(state, action) {
        switch(action.type) {
            case SELECT_NEW_SECTION: {
                if(state.sidebar.selectedSection === "Ads") 
                    this.refs.ads.style.display = "block";
                else 
                    this.refs.ads.style.display = "none";
                break;
            }
        }
    }

    render() {
        return `
        <div class="stage" data-ref="ads" style="none">
            <!-- Starts a form -->
            <form action="" class="ad-form" id="ad-form">
                <div class="ad-form__text">Description</div>
                <textarea name="description" cols="30" rows="10" class="ad-form__input ad-form__input--type-textarea" placeholder="Description"></textarea>

                <div class="ad-form__text">Mentions</div>
                <input type="text" class="ad-form__input" placeholder="Mentions">

                <div class="ad-form__text">Hashtags</div>
                <input type="text" class="ad-form__input" placeholder="Hashtags">

                <div class="ad-form__lower-section">
                    <div class="ad-form__lower-section__1">
                        <div class="ad-form__text">Number of Iterations</div>
                        <div class="ad-form__lower-section__dropdown">
                            <div class="ad-form__lower-section__dropdown__value"></div>
                            <div class="ad-form__lower-section__dropdown__btn"><span class="material-icons-outlined">expand_more</span></div>
                        </div>
                    </div>

                    <div class="ad-form__lower-section__2">
                        <div class="ad-form__text">Interests</div>
                        <div class="ad-form__lower-section__2__btns">
                            <div class="ad-form__lower-section__2__interest">Cricket</div>
                            <div class="ad-form__lower-section__2__add-interest">
                                <span class="material-icons-outlined" style="cursor: pointer;">add_circle_outline</span>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div class="ad-form__text">Embedded Media</div>
                <div class="ad-form__media-section">
                    <div class="ad-form__media-section__1"><span class="material-icons-outlined" style="cursor: pointer;">add_photo_alternate</span></div>
                    <div class="ad-form__media-section__1"><span class="material-icons-outlined" style="cursor: pointer;">video_library</span></div>
                    <div class="ad-form__media-section__2">Pricing varies depending on the amount of embeded media included and the number of iterations requested for the advertisement. Read our <span style="color: #58DCB2; cursor: pointer;">Terms & Conditions</span> for more information.</div>
                </div>

                <div class="ad-form__btn-section">
                    <button class="ad-form__btn-section__btn ad-form__btn-section__btn--color-green" type="submit" form="ad-form">Continue</button>
                    <div class="ad-form__btn-section__btn ad-form__btn-section__btn--color-white" >Cancel</div>
                </div>
            </form>
    </div>`;
    }
}

export { Ads };