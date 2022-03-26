class CloseButton extends HTMLElement {
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
    this.template = document.createElement('template');
    this.template.innerHTML = `
      <span class="close"></span>
    `;

    this.styles = document.createElement('style');
    this.styles.innerHTML = `   
      .close {
        position: absolute;
        top: -1rem;
        right: -1rem;
        width: 3.6rem;
        height: 3.6rem;
        background: #ddd;
        border-radius: 50% 100%;
        cursor: pointer;
        transition: .2s;
      }

      .close:hover {
        background: #cecece;
      }

      .close::after {
        content: '\\2716';
        position: absolute;
        font-size: 1.2rem;
        right: 1rem;
        top: 1rem;
        color: #333;
        line-height: 1;
        pointer-events: none;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
    this.shadowRoot.appendChild(this.template.content);
    this.shadowRoot.appendChild(this.styles);
  }

  addBorder() {
    this.shadowRoot.querySelector('img').style.border = `5px solid green`;
  }
}

customElements.define('close-button', CloseButton);
export default CloseButton;