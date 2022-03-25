import Component from "../../lib/flux/component/Component.js";
import IssueCardActions from "./IssueCardActions.js";


class IssueCard extends Component
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
        this.dispatch(IssueCardActions.selectIssue({id: event.currentTarget.getAttribute("data-ref"), data:window.IssueCollection.props.issueList[event.currentTarget.getAttribute("data-ref")]}));
        document.getElementById("middle-panel").scrollTo({ top: 0, behavior: 'smooth' });
    }


    render()
    {
        let htmlStr = `
                        <div class="grid__collg4 grid__colmd6 grid__colsm6 btn issue-card bg-card bg-color-white v-border-r-32px f-poppins v-margin-b-32px v-margin-l-16px v-margin-r-16px" onclick="window.${this.name}.clickCard(event)" data-ref="${this.props.id}">
                            <div class="grid__collg12 grid__colmd12 grid__colsm12 v-margin-t-32px v-margin-l-32px v-margin-r-32px v-margin-b-32px f-w-md t-lg-sm" data-ref="title">${this.props.title}</div>`;
            if(this.props.subSection == '/accepted')
            {
                
                if(this.props.unReadMessages.length != 0)
                {
                    htmlStr = htmlStr.concat(`<div class="grid__collg12 grid__colmd12 grid__colsm12 bg-color-orange v-margin-l-32px t-color-white f-w-rg t-rg" style="display: flex; justify-content: center; align-items: center; border-radius:100%; width: 2.5rem; height: 2.5rem;" data-ref="tagOne" id="tagOne${this.props.id}">${this.props.unReadMessages.length}</div>`);
                }else if(this.props.state == "closed")
                {
                    htmlStr = htmlStr.concat(`<div class="grid__collg12 grid__colmd12 grid__colsm12 tag-resolved v-margin-l-32px v-border-r-24px t-color-white f-w-rg t-ex-sm" style="display: flex; justify-content: center; align-items: center; width: 5.125rem; height: 2.154375rem; background-color: #08AA82;" data-ref="tagTwo${this.props.id}" id="tagTwo">Resolved</div>`);
                }else
                {
                    htmlStr = htmlStr.concat(`<div class="grid__collg12 grid__colmd12 grid__colsm12 tag-resolved v-margin-l-32px v-border-r-24px t-color-white f-w-rg t-ex-sm" style="display: flex; justify-content: center; align-items: center; background-color: #08AA82;" data-ref="tagThree" id="tagThree${this.props.id}"></div>`);
                }
            }

            htmlStr = htmlStr.concat(`
                            <div class="grid__collg12 grid__colmd12 grid__colsm12 t-color-dark v-margin-t-32px v-margin-l-32px v-margin-b-32px" style="display: flex; align-items: center;">
                                <div class="t-md-sm f-w-md v-margin-r-8px">Accepted by</div>
                                <div class="v-margin-r-8px">
                                    <img src="../../img/kamran-ch-BgTc5D1HoCc-unsplash.jpg" class="issue-accepted-by-propic v-border-r-100" style="width: 2.25rem; height: 2.25rem;">
                                </div>
                                <div class="t-ex-sm f-w-md">
                                    Rajitha Kumara
                                </div>
                                
                            </div>
                        </div>`);

        return htmlStr;
    }
}

export default IssueCard;