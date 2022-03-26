class CustomAccordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.activeAccordion = this.querySelector('.accordion.open') || null;
    this.addEventListener('click', e => this.openAccordion(e));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.template = document.createElement('template');
    this.template.innerHTML = `
    <div class="accordion">
      <div class="accordion_header">
        <p class="accordion_title">HTML</p>
        <span class="accordion_arrow">&#10094;</span>
      </div>
      <div class="accordion_content">
        <p>HTML（超文本标记语言——HyperText Markup Language）是构成 Web 世界的一砖一瓦。它定义了网页内容的含义和结构。除 HTML 以外的其它技术则通常用来描述一个网页的表现与展示效果（如 CSS），或功能与行为（如 JavaScript）。</p>
        <p>“超文本”（hypertext）是指连接单个网站内或多个网站间的网页的链接。链接是网络的一个基本方面。只要将内容上传到互联网，并将其与他人创建的页面相链接，你就成为了万维网的积极参与者。</p>
      </div>
    </div>
    <div class="accordion">
      <div class="accordion_header">
        <p class="accordion_title">CSS</p>
        <span class="accordion_arrow">&#10094;</span>
      </div>
      <div class="accordion_content">
        <p>层叠样式表 (Cascading Style Sheets，缩写为 CSS），是一种 样式表 语言，用来描述 HTML 或 XML（包括如 SVG、MathML、XHTML 之类的 XML 分支语言）文档的呈现。CSS 描述了在屏幕、纸质、音频等其它媒体上的元素应该如何被渲染的问题。</p>
      </div>
    </div>
    <div class="accordion">
      <div class="accordion_header">
        <p class="accordion_title">JavaScript</p>
        <span class="accordion_arrow">&#10094;</span>
      </div>
      <div class="accordion_content">
        <p>JavaScript ( JS ) 是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。虽然它是作为开发Web 页面的脚本语言而出名的，但是它也被用到了很多非浏览器环境中，例如 Node.js、 Apache CouchDB 和 Adobe Acrobat。JavaScript 是一种基于原型编程、多范式的动态脚本语言，并且支持面向对象、命令式和声明式（如函数式编程）风格。了解更多 JavaScript。</p>
        <p>本部分将专注于 JavaScript 语言本身，而非局限于网页或其他限制环境。想要了解网页有关的 APIs ，请参考 Web APIs 以及 DOM。</p>
      </div>
    </div>
    <style>
      :host {
        display: block;
        max-width: 500px;
        margin: auto;
      }

      .accordion {
        padding: 2rem 0;
        border-bottom: 2px solid white;
      }

      .accordion_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .accordion_title {
        margin: 0;
        font-size: 1.4rem;
        font-weight: bold;
      }

      .accordion_arrow {
        transform: rotate(-90deg);
        transition: transform .3s ease;
      }

      .accordion.open .accordion_arrow {
        transform: rotate(90deg);
      }

      .accordion_content {
        max-height: 0;
        overflow: hidden;
        will-change: max-height;
        transition: max-height .5s ease-in-out;
        font-size: .8em;
      }

      .accordion_content > * {
        margin: 0;
        margin-top: 16px;
      }

      .accordion.open .accordion_content {
        max-height: var(--max-height);
      }
    </style>
    `;
    this.shadowRoot.appendChild(this.template.content);
  }

  openAccordion(e) {
    if (this.activeAccordion) {
      this.activeAccordion.classList.remove('open');
    }
    this.activeAccordion = e.composedPath().find(function findAccordion(elem){
      return elem.classList.contains('accordion');
    });

    let innerContentHeight = 0;
    let innerElements = this.activeAccordion
      .querySelectorAll('.accordion_content > *');
    innerElements.forEach(function(element) {
      let marginPx = window.getComputedStyle(element)
        .getPropertyValue('margin-top');
      let marginNumber = Number(marginPx.replace('px', ''));
      let elementHeight = element.offsetHeight;
      innerContentHeight = innerContentHeight + marginNumber + elementHeight;
      return innerContentHeight;
    });
    this.activeAccordion.style.setProperty(
      '--max-height',
      `${innerContentHeight}px`
    );
    this.activeAccordion.classList.add('open');
  }
}

customElements.define('custom-accordion', CustomAccordion);
export default CustomAccordion;
