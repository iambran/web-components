import CustomerAvatar from "./Customer-Avatar.js";
import CloseButton from "./Close-Button.js";
class CustomerTestimonial extends HTMLElement {
    constructor() {
        super();

        // 附加一个shadow root
        this.attachShadow({mode: 'open'});
    }

    // connectedCallback() 生命周期回调函数
    connectedCallback() {
        this.render();
        // 事件监听器
        this.shadowRoot.querySelector('close-button')
            .addEventListener('click', (e) => {
                // console.log(e.target);
                this.hide();
            });

        document.addEventListener('click', (e) => {
            console.log(e.target);
            console.log(e.composedPath());
            if (!e.composedPath().includes(this) && e.target.nodeName.toLowerCase() !== 'button') {
                this.hide();
            }
        });
    }

    render() {
        let testimonialContent = this.dataset.content;
        let testimonialName = this.dataset.name;
        let testimonialPosition = this.dataset.position;
        this.template = document.createElement('template');
        this.template.innerHTML = `
        <div class="testimonial">
            <div class="testimonial__content">
                ${testimonialContent}
            </div>
            <div class="testimonial__footer">
            <customer-avatar src="./img/avatar.jpg"></customer-avatar>
            <div>
                <div class="testimonial__name">
                    ${testimonialName}
                </div>
                <div class="testimonial__role">
                    ${testimonialPosition}
                </div>
            </div>
            </div>
            <close-button></close-button>
        </div>
        `;

        this.styles = document.createElement('style');
        this.styles.innerHTML = `

        :host {
            display: none;
            max-width: 500px;
            margin-inline: auto;
            border-radius: 20px;
            box-shadow: 0 2px 40px rgba(0 0 0 / 25%);
            background: white;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            overflow: hidden;
        }

        :host(.show) {
            display: block;
        }

        .testimonial {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 0 auto;
            padding: 4vmin 8vmin;
        }

        .testimonial__content {
            font-size: 25px;
            margin-bottom: 45px;
        }

        .testimonial__footer {
            display: flex;
            align-items: center;
        }

        .testimonial__name {
            font-size: 14px;
            font-weight: bold;
        }

        .testimonial__role {
            font-size: 14px;
        }
        `;
        this.shadowRoot.appendChild(this.template.content);
        this.shadowRoot.appendChild(this.styles);
    }

    open() {
        this.classList.add('show');
    }

    hide() {
        this.classList.remove('show');
    }
}

customElements.define('customer-testimonial', CustomerTestimonial);
export default CustomerTestimonial;
