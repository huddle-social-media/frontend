import Component from "../../lib/flux/component/Component.js";
import createComponent from "../../lib/flux/createComponent/createComponent.js";
import IssueCard from "../IssueCard/IssueCard.js";
import IssueCardActions from "../IssueCard/IssueCardActions.js";

class IssueCollection extends Component
{
    constructor(props = {})
    {
        super(props);
        this.props['issueList'] = [];
        this.props['lastDate'] = "";
        this.updateList = this.updateList.bind(this);
        this.render = this.render.bind(this);
    }

    updateList()
    {
        if(this.props.pending)
        {
            const issueColl = this.refs.issueColl;
            this.props.pending.forEach(item => {
                item['id'] = this.props.issueList.length;
                let tempIssueCard = new IssueCard(item);
                this.props.issueList.push(tempIssueCard);
                let element = createComponent(tempIssueCard);
                if(item.date !== this.props.lastDate)
                {
                    this.props.lastDate = item.date;
                    issueColl.innerHTML += `<div class="grid__collg12 grid__colmd12 grid__colsm12 f-poppins t-color-gray f-w-rg t-md-sm v-margin-t-64px v-margin-b-32px v-margin-l-64px v-margin-r-64px">${item.date}</div>`;
                    
                }
                issueColl.appendChild(element);
                window[tempIssueCard.name] = tempIssueCard;
            });
            this.props.pending = [];

        }

        this.dispatch(IssueCardActions.selectIssue({id:0, data:this.props.issueList[0]}));
    }

    render()
    {
        let htmlStr = `<div class="grid grid__collg12 grid__colmd12 grid__colsm12 v-margin-l-16px v-margin-r-16px issue__cards__area" data-ref="issueColl"></div>`;
        return htmlStr;
    }
}

export default IssueCollection;