'use strict';

const e = React.createElement;

class AboutAssParagraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clicked: false};
    }

    render() {
        if (this.state.clicked) {
            return 'This is an auction site, where you can bid and everything. ' +
                'Be careful tho.... This was made with React :P';
        }

        return e("button", {
            style: {
                background: "#824CA4",
                width: "22%",
                height: "40px",
                color: "white"
            }, onClick: () => this.setState({clicked: true})
        }, 'About Us');
    }
}

const domContainer = document.querySelector('#paragraphId');
const root = ReactDOM.createRoot(domContainer);
root.render(e(AboutAssParagraph));