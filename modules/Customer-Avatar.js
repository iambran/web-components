class CustomerAvatar extends HTMLElement {
    constructor() {
        super();

        // 附加一个shadow root
        this.attachShadow({mode: 'open'});
    }

    // connectedCallback() 生命周期回调函数
    connectedCallback() {
        this.render();
    }

    render() {
        let avatar = this.getAttribute('src');
        this.template = document.createElement('template');
        this.template.innerHTML = `
        <img alt="avatar" src="${avatar}">
        `;

        this.styles = document.createElement('style');
        this.styles.innerHTML = `
        img {
            display: block;
            max-width: 50px;
            max-height: 50px;
            margin-right: 15px;
            border-radius: 999px;
        }
        `;
        this.shadowRoot.appendChild(this.template.content);
        this.shadowRoot.appendChild(this.styles);
    }

    addBorder() {
        this.shadowRoot.querySelector('img').style.border = `5px solid green`;
    }
}

customElements.define('customer-avatar', CustomerAvatar);
export default CustomerAvatar;
