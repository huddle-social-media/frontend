import Component from "../../lib/flux/component/Component.js";

class Profile extends Component {
    constructor(props = {}) {
        super(props);
    }

    render() {
        let htmlStr = `<div class="grid__collg12 grid__colmd12 grid__colsm12 profile__section-sm" style="display: flex; flex-direction: column; align-items: center; position: relative; margin-bottom: 6rem; height: fit-content;">
        <div class="bg-card v-border-r-32px grid v-margin-l-32px v-margin-r-32px f-poppins profile__section__hero-sm" style="display: flex; align-items: center;">
            <div class="v-margin-t-32px v-margin-l-32px v-margin-r-32px v-margin-b-32px">  
        `;
        if(this.props.propic) {
            htmlStr = htmlStr.concat(`
                <img src="${this.props.propic}" class="v-border-r-100" style="width: 13.625rem; height: 13.625rem;">`)
        }
        htmlStr = htmlStr.concat(`</div>
            <div class="v-margin-t-32px v-margin-r-32px v-margin-b-32px f-poppins profile__section-info-sm">
            <!-- Details section -->
            <div class="v-margin-b-16px" style="display: flex; align-items: center;">
                <div class="h-md t-color-gray v-margin-r-8px">${this.props.name}</div>
                <div class="t-sm t-color-gray f-w-rg">${this.props.username}</div>
            </div>
            <div class="t-md t-color-gray v-margin-b-16px">
                ${this.props.bio}
            </div>
            <div class="t-sm t-color-gray profile__hero-icons" style="display: flex; align-items: center;">
                <div class="v-margin-r-16px" style="display: flex; align-items: center;"><span class="material-icons v-margin-r-8px">interests</span><span>${this.props.interest}</span></div>
        `);

        if(this.props.location) {
            htmlStr = htmlStr.concat(`<div class="v-margin-r-16px" style="display: flex; align-items: center;"><span class="material-icons v-margin-r-8px">place</span><span>${this.props.location}</span></div>`);
        }

        htmlStr = htmlStr.concat(`
        <div class="v-margin-r-16px"><span class="material-icons">male</span></div>
        `);
        if(this.props.type === "casual") {
            htmlStr = htmlStr.concat(`
            <div class="t-color-orange v-margin-r-16px" style="display: flex; align-items: center; cursor: pointer;">more</div>`);
        }else if(this.props.type === "celebrity") {
            htmlStr = htmlStr.concat(`
            <div class="t-color-orange v-margin-r-16px" style="display: flex; align-items: center; cursor: pointer;">auto</div>`);
        }
        if(!this.props.owner) {
            if(this.props.following) {
                htmlStr = htmlStr.concat(`
                <div class="v-border-r-32px t-color-orange t-md f-w-md" style="border: 2px solid #FE793D; display: flex; justify-content: center; align-items: center; padding: 0.4rem; width: 6rem;cursor: pointer;">Following</div>
                `)
            }else {
                htmlStr = htmlStr.concat(`
                <div class="v-border-r-32px t-color-orange t-md f-w-md" style="border: 2px solid #FE793D; display: flex; justify-content: center; align-items: center; padding: 0.4rem; width: 6rem;cursor: pointer;">Follow</div>
                `)
            }
        }
        htmlStr = htmlStr.concat(`</div></div></div>`);
        if(this.props.autoGraphVisibility) {
            htmlStr = htmlStr.concat(`
            <div class="bg-card v-border-r-32px autograph__card t-color-gray bg-color-white f-poppins autograph__section-sm" style="display: flex; flex-direction: column; align-items: center; width: fit-content; position: absolute; bottom: -64px;">
            <div class="v-margin-b-8px v-margin-t-8px">
                <img src="" class="v-margin-r-8px">
                <span class="h-ex-sm f-pacifico">${this.props.signature}</span>
            </div>
            <div style="display: flex; align-items: center;" class="v-margin-b-8px v-margin-l-64px v-margin-r-64px">
                <div class="t-md f-w-md v-margin-r-8px"><span>Signed by</span></div>
                <div style="display: flex; align-items: center;">
                    <img src="${this.props.signedUserPropic}" class="v-border-r-100 v-margin-r-8px" style="width: 2.25rem; height: 2.25rem;">
                    <div class="t-md-sm"><span>${this.props.signedUser}</span></div>
                </div>
            </div>
            </div>`);
        }
        htmlStr = htmlStr.concat(`</div>`);
        return htmlStr;
    }
}

export default Profile;