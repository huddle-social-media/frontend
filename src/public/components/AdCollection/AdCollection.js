import Component from "../../lib/flux/component/Component.js";
import createComponent from "../../lib/flux/createComponent/createComponent.js";
import AdCard from "../AdCard/AdCard.js";


class AdCollection extends Component
{
    constructor(props = {})
    {
        super(props);
        this.props['adList'] = [];
        this.props['lastDate'] = "";
        this.props['validAds'] = 0;
        this.onCreate = this.onCreate.bind(this);
        this.render = this.render.bind(this);
        this.updateList = this.updateList.bind(this);

    }

    onCreate()
    {
        this.updateList();
    }

    updateList()
    {
        if(this.props.pending)
        {
            const adColl = this.refs.adColl;
            this.props.pending.forEach(item => {
                item['id'] = this.props.adList.length;
                let tempAdCard = new AdCard(item);
                this.props.adList.push(tempAdCard);
                let element = createComponent(tempAdCard);
                if(item.ad_date !== this.props.lastDate)
                {
                    this.props.lastDate = item.ad_date;
                    adColl.innerHTML += `<div class="grid__collg12 grid__colmd12 grid__colsm12 f-poppins t-color-gray f-w-rg t-md-sm v-margin-t-64px v-margin-b-32px v-margin-l-64px v-margin-r-64px">${item.ad_date}</div>`;
                    
                }
                adColl.appendChild(element);
                window[tempAdCard.name] = tempAdCard;
            });

            this.validAds += this.props.pending.length;
            this.props.pending = []; 
        }else if(this.props.validAds == 0)
        {
            window.__MIDDLE_PANEL__.innerHTML = "";
            window.__MIDDLE_PANEL__.innerHTML = `<div class="bg-card h-md t-color-gray v-border-r-32px bg-color-white v-margin-l-32px v-margin-t-64px v-margin-r-32px f-poppins" style="align-items: center; padding: 2rem 0rem; text-align: center;" data-ref="issue">No advertisements to display.</div>`;
        }
    }

    render()
    {
        let htmlStr = `<div data-ref="adColl"></div>`;
        return htmlStr;
    }
}

export default AdCollection;