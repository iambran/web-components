class CustomerTestimonial extends HTMLElement {
    constructor() {
        super();

        // 附加一个shadow root
        this.attachShadow({mode: 'open'});
        this.template = document.createElement('template');
        this.template.innerHTML = `
        <div class="testimonial">
            <div class="testimonial__content">
            “Brandon's CSS Grid tutorial is awesome. It covers so many details. Love that you use diagram from Figma to explain those details.”
            </div>
            <div class="testimonial__footer">
            <img alt="avatar" src="./img/avatar.jpg" class="testimonial__avatar">
            <div>
                <div class="testimonial__name">
                    Sienna Lee
                </div>
                <div class="testimonial__role">
                    Web Administrator
                </div>
            </div>
            </div>
        </div>  
        `;

        this.styles = document.createElement('style');
        this.styles.innerHTML = `
        .testimonial {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 0 auto;
            cursor: pointer;
            padding: 4vmin 8vmin;
            border-radius: 20px;
            box-shadow: 0 2px 40px rgba(0 0 0 / 25%);
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
        }
          
        .testimonial__name {
            font-size: 14px;
            font-weight: bold;
        }
          
        .testimonial__role {
            font-size: 14px;
        }
        `;
    }

    // connectedCallback() 生命周期回调函数
    connectedCallback() {
        // this.appendChild(this.template.content);
        // this.appendChild(this.styles);
        this.shadowRoot.appendChild(this.template.content);
        this.shadowRoot.appendChild(this.styles);
    }
}

customElements.define('customer-testimonial', CustomerTestimonial);