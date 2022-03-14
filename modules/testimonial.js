import CustomerAvatar from "./avatar.js";
class CustomerTestimonial extends HTMLElement {
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
        </div>  
        `;

        this.styles = document.createElement('style');
        this.styles.innerHTML = `
        
        :host {
            display: block;
            max-width: 500px;
            margin-inline: auto;
            border-radius: 20px;
            box-shadow: 0 2px 40px rgba(0 0 0 / 25%);
            background: white;
        }

        .testimonial {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 0 auto;
            cursor: pointer;
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

    changeBackground() {
        this.style.background = 'orange';
    }
}

customElements.define('customer-testimonial', CustomerTestimonial);
export default CustomerTestimonial;