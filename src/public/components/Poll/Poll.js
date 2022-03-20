import getPercentages from "../../apis/commonAPIs/pollApi.js";
import Component from "../../lib/flux/component/Component.js";

class Poll extends Component {
    constructor(props = {}) {
        super(props);
        this.statusTimer;
        this.voting = this.voting.bind(this);
        this.removeListeners = this.removeListeners.bind(this);
        this.markAsVoted = this.markAsVoted.bind(this);
        this.markAsNotVoted = this.markAsNotVoted.bind(this);
        this.markAsFinished = this.markAsFinished.bind(this);
        this.render = this.render.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    voting(event) {
        this.props.voted = true;
        this.props.votedOption = event.currentTarget.getAttribute("data-ref");
        this.markAsVoted();
    }

    removeListeners() {
        this.props.options.forEach(element => {
            this.refs[element.option].removeEventListener('click', this.voting);
        });
    }

    markAsVoted() {
        this.removeListeners();
        getPercentages(this.props.username, this.props.pollId).then(percentages => {
            percentages.forEach(element => {
                this.refs[element.option+"PercentageProgress"].style.width = element.percentage+'%';
                this.refs[element.option+"PercentageProgress"].style.backgroundColor = "#E3E3E3";
                this.refs[element.option+"Percentage"].innerText = element.percentage+'%';
            });
            this.refs[this.props.votedOption+"Text"].style.color = "#FFFFFF";
            this.refs[this.props.votedOption+"PercentageProgress"].style.backgroundColor = "#FE793D";
            this.refs.status.innerHTML = 'Voted';
        }).catch(e => {
            console.log(e);
        });
    }

    markAsNotVoted() {
        this.statusTimer = setInterval(() => {
            const remain = ((new Date()).getTime() - (new Date(
                this.props.publishedTime.year,
                this.props.publishedTime.month,
                this.props.publishedTime.day,
                this.props.publishedTime.h,
                this.props.publishedTime.m,
                this.props.publishedTime.s,
                this.props.publishedTime.ms
                )).getTime())/(1000);
            if(remain > 86400) {
                this.markAsFinished();
                return;
            }
            if(!this.props.voted) {
                if(Math.floor(remain/(60*60)) < 0) {
                    this.refs.status.innerText = (60 - Math.floor(remain/60))+"min left"
                } else {
                    this.refs.status.innerText = (24 - Math.floor(remain/(60*60)))+"hrs left"
                }
            }
        }, 1000);

        this.props.options.forEach(element => {
            this.refs[element.option].addEventListener('click', this.voting);
        });
    }

    markAsFinished() {
        this.removeListeners();
        if(this.statusTimer) {
            window.clearInterval(this.statusTimer);
        }
        getPercentages(this.props.username, this.props.pollId).then(percentages => {
            percentages.forEach(element => {
                this.refs[element.option+"PercentageProgress"].style.width = element.percentage+'%';
                this.refs[element.option+"PercentageProgress"].style.backgroundColor = "#E3E3E3";
                this.refs[element.option+"Percentage"].innerText = element.percentage+'%';
            });
            this.refs.status.innerHTML = 'Finished';
        }).catch(e => {
            console.log(e);
        });
    }

    onCreate() {
        
        if((((new Date()).getTime() - (new Date(
            this.props.publishedTime.year,
            this.props.publishedTime.month,
            this.props.publishedTime.day,
            this.props.publishedTime.h,
            this.props.publishedTime.m,
            this.props.publishedTime.s,
            this.props.publishedTime.ms
        )).getTime())/(1000)) < 86400) {
            if(this.props.voted) {
                this.markAsVoted();
                return;
            }
        } else {
            if(this.props.voted) {
                this.markAsVoted();
                return;
            }
            this.markAsFinished();
            return;
        }
        this.markAsNotVoted();
    }

    render() {
        let htmlStr = `<div class="bg-color-white bg-card v-margin-l-32px v-margin-b-32px v-margin-r-32px f-poppins t-color-gray v-border-r-32px">
        <div class="grid">
            <div class="h-md t-color-dark v-margin-l-32px grid__collg11 grid__colmd11 grid__colsm11 v-margin-t-32px v-margin-b-16px v-margin-r-16px">${this.props.title}</div>
            <div class="t-color-gray grid__collg1 grid__colmd1 grid__colsm1 v-margin-r-32px" style="display: flex; align-items: center;">
                <div class="t-sm v-margin-r-16px">${this.props.interest}</div>
                <div><span class="material-icons">more_horiz</span></div>
            </div>
        </div>
        <div> <!-- holder -->`;
        this.props.options.forEach(element => {
            htmlStr = htmlStr.concat(`
            <div class="bg-color-light-gray v-border-r-32px v-margin-l-32px v-margin-r-32px v-margin-b-16px" style="height: 4rem; position: relative; cursor: pointer;" data-ref="${element.option}">
                <div class="v-border-r-32px" style="height: 4rem;" data-ref="${element.option}PercentageProgress">
                    <div style="height: 4rem; display: flex; align-items: center; justify-content: space-between; padding-left: 1rem; padding-right: 1rem; position: absolute; width: 100%">
                        <div data-ref="${element.option}Text">${element.option}</div>
                        <div data-ref="${element.option}Percentage"></div>
                    </div>
                </div>
            </div>
            `)
        });
        htmlStr = htmlStr.concat(`
        </div>
        <div class="v-margin-l-32px v-margin-r-32px v-margin-b-32px grid">
        <div class="f-poppins grid__collg8 grid__colmd8 grid__colsm6" style="display: flex; align-items: center;">
            <img style="width: 4rem; height: 4rem;" class="v-margin-r-16px v-border-r-100" src="${this.props.propicUrl}">
            <div>
                <div class="grid">
                    <div class="grid__collg4 grid__colmd4 grid__colsm12 t-color-dark t-md-sm f-w-md v-margin-r-8px" style="cursor: pointer;">by ${this.props.name}</div>
                    <div class="grid__collg1 grid__colmd1 grid__colsm12 t-color-gray f-w-rg t-sm">${this.props.time}</div>
                </div>
                <div class="t-color-gray f-w-rg t-sm">
                    <span style="cursor: pointer">@${this.props.username}</span>
                </div>
            </div>
        </div>
        <div class="grid__collg4 grid__colmd4 grid__colsm6" style="position: relative; display: flex; align-items: center;">
            <div class="t-color-gray f-poppins" style="display: flex; align-items: center; position: absolute; right: 0;">
            <div class="v-margin-r-16px" style="display: flex; align-items: center;">
                <div class="t-sm f-w-rg v-margin-l-8px"><span>${this.props.voteCount}</span> Votes | <span data-ref="status"></span></div>
                </div>
                <div class="v-margin-r-16px" style="display: flex; align-items: center;">
                    <div class="icon-like_button local-icons" style="cursor: pointer;"></div>
                    <div class="t-sm f-w-rg v-margin-l-8px">${this.props.likeCount}</div>
                </div>
            </div>
        </div>
        </div>
        </div>
        `);
        return htmlStr;
    }
}

export default Poll;