import Component from "../../lib/flux/component/Component.js";
import createComponent from "../../lib/flux/createComponent/createComponent.js";

class AdCard extends Component
{
    constructor(props = {})
    {
        super(props);
        this.clickCard = this.clickCard.bind(this);
        this.render = this.render.bind(this);
    }

    clickCard(event)
    {
        event.stopPropagation();
        this.dispatch(EventCardActions.selectEvent({id: event.currentTarget.getAttribute("data-ref"), data:window.EventCollection.props.eventList[event.currentTarget.getAttribute("data-ref")]}));
        document.getElementById("middle-panel").scrollTo({ top: 0, behavior: 'smooth' });
    }

    showAttendees(event)
    {
        event.stopPropagation();
        this.dispatch(EventCardActions.selectEvent({id: event.currentTarget.getAttribute("data-ref"), data:window.EventCollection.props.eventList[event.currentTarget.getAttribute("data-ref")]}));
        this.dispatch(EventMapActions.openLeftSide());
        document.getElementById("middle-panel").scrollTo({ top: 0, behavior: 'smooth' });
    }


    render()
    {
        let htmlStr = `<div class="bg-card v-border-r-32px f-poppins bg-color-white v-margin-l-32px v-margin-r-32px">
        <div class="v-margin-l-16px v-margin-r-16px v-margin-t-16px v-margin-b-16px bg-color-white">
            <div class="v-border-r-32px bg-color-light-gray" style="overflow: hidden;">
                <div style="overflow:hidden;"><img src="imgs/ad.jpg" alt="" style="margin-left: auto; margin-right: auto; display: block; height: 100%; width: 100%; object-fit: contain;"></div>
                <div style="display: flex; align-items: center; padding:2rem;">
                    <div style="display: flex; flex-direction: column;">
                        <div class="t-sm f-w-rg"><a href="">www.nike.com</a></div>
                        <div class="h-sm t-color-gray">Get yours here! Nike. Just do it. Nike.com</div>
                    </div>
                    <div class="t-md f-w-sb t-color-gray v-border-r-16px btn" style="margin-left: auto; border: 0.125rem solid #7E7E7E; padding: 0.5rem 1rem;">Shop Now</div>
                </div>
            </div>
            
            <div class="v-margin-l-16px v-margin-r-16px">
                <div class="t-rg t-color-gray v-margin-t-16px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas lacus at tellus aliquet tempor. Lorem ipsum dolor sit amet consectetur.</div>

                <div class="grid__collg12 grid__colmd12 grid__colsm12 v-margin-t-64px v-margin-b-32px grid">
                    <div class="profile__card f-poppins grid__collg10 grid__colmd9 grid__colsm8" style="display: flex; align-items: center;">
                        <img class="v-margin-r-16px v-border-r-100 profile__card-pic" src="./imgs/kamran-ch-BgTc5D1HoCc-unsplash.jpg">
                        <div>
                            <div class="grid">
                                <div class="grid__collg4 grid__colmd4 grid__colsm12 t-color-dark t-md-sm f-w-md v-margin-r-8px">by Rajitha Kumara</div>
                                <div class="grid__collg1 grid__colmd1 grid__colsm12 t-color-gray f-w-rg t-sm" >18hrs</div>
                            </div>
                            <div class="t-color-gray f-w-rg t-sm">
                                @rajitha_kumara
                            </div>
                        </div>
                    </div>
                    <div class="grid__collg2 grid__colmd3 grid__colsm4" style="position: relative; display: flex; align-items: center;">
                        <div class="t-color-gray f-poppins reaction__card">
                            <div class="v-margin-r-16px btn">
                                <div class="icon-like_button local-icons"></div>
                                <div class="t-sm f-w-rg v-margin-l-8px">999m</div>
                            </div>
                            <div class="btn">
                                <div class="icon-comment_button local-icons"></div>
                                <div class="t-sm f-w-rg v-margin-l-8px">999m</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>`;

        return htmlStr;
    }
}

export default AdCard;