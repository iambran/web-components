class CustomerTestimonial extends HTMLElement {
    constructor() {
        super();

        // 附加一个shadow root
        this.attachShadow({mode: 'open'});
        
    }

    // connectedCallback() 生命周期回调函数
    connectedCallback() {
        let testimonialContent = this.dataset.content;
        let testimonialAvatar = this.dataset.avatar;
        let testimonialName = this.dataset.name;
        let testimonialPosition = this.dataset.position;
        this.template = document.createElement('template');
        this.template.innerHTML = `
        <div class="testimonial">
            <div class="testimonial__content">
                ${testimonialContent}
            </div>
            <div class="testimonial__footer">
            <img alt="avatar" src="${testimonialAvatar}" class="testimonial__avatar">
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
        /*
        :host {
            display: block;
            width: 50vw;
            margin-top: 100px;
        }

        :host([orange]) .testimonial {
            background: orange;
        }

        :host(.purple) .testimonial {
            border: 5px solid purple;
        }

        :host(:not(.purple)) .testimonial {
            border: 5px dashed black;
        }
        */

        :host {
            font-family: initial;
        }
        .testimonial {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 0 auto;
            cursor: pointer;
            padding: 4vmin 8vmin;
            border-radius: 20px;
            box-shadow: 0 2px 40px rgba(0 0 0 / 25%);

            border: 5px solid var(--border-color, orange);
          }
          
        .testimonial__content {
            font-size: 25px;
            margin-bottom: 45px;
        }
          
        .testimonial__footer {
            display: flex;
            align-items: center;
        }
          
        .testimonial__avatar {
            display: block;
            max-width: 50px;
            max-height: 50px;
            margin-right: 15px;
            border-radius: 999px;
            border: 5px solid var(--avatar-border-color, green);
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
}

customElements.define('customer-testimonial', CustomerTestimonial);