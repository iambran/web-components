import randomID from './randomID.mjs';

class CustomTabs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.switchTabs = this.switchTabs.bind(this);
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('.tabs').addEventListener('click', this.switchTabs);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class='tabs'>
        <slot name='tab'>默认标题</slot>
      </div>
      <div class='panels'>
        <slot name='panel'>默认内容。。。</slot>
      </div>
      <style>
        ::slotted([slot="panel"]) {
          display: none;
          grid-template-columns: 2fr 3fr;
          gap: 1rem;
          margin-top: 4rem;
          align-items: start;
        }
        ::slotted([slot="panel"].active) {
          display: grid;
        }
        ::slotted(.active) {
          display: block;
        }
        ::slotted([slot="tab"].active) {
          outline: 3px solid var(--accent-color);
        }
        .tabs {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
        }
        ::slotted([slot="tab"]) {
          background: transparent;
          border: none;
          border-radius: 2rem;
          padding: 1rem .5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.2rem;
          font-weight: bold;
          outline: 3px solid var(--border-color);
        }

      </style>
    `;
    this.tabs = this.shadowRoot.querySelector('slot[name="tab"]')
      .assignedElements({flatten: true});
    // console.log(this.tabs);
    this.panels = this.shadowRoot.querySelector('slot[name="panel"]')
      .assignedElements({flatten: true});
    // console.log(this.panels);
    if (this.tabs.length !== this.panels.length) {
      console.error('slot tab的数量必须和slot panel的数量一致');
    }

    for (let i=0; i < this.tabs.length; i++) {
      let id = randomID();
      this.tabs[i].id = `button-${id}`;
      this.panels[i].id = `panel-${id}`;
      if (i === 0) {
        this.tabs[i].classList.add('active');
        this.panels[i].classList.add('active');
      }
    }
  }
  switchTabs(e) {
    // console.log(this);
    if (e.target.matches('[slot="tab"]')) {
      let activeTab = this.tabs.find(tab => tab.classList.contains('active'));
      let activePanel = this.panels.find(panel => panel.classList.contains('active'));
      // console.log(activeTab, activePanel);
      if (activeTab && activePanel) {
        activeTab.classList.remove('active');
        activePanel.classList.remove('active');
      }
      activeTab = e.target;
      let tabID = activeTab.id.split('-')[1];
      // console.log(tabID);
      activePanel = this.panels.find(panel => panel.id === `panel-${tabID}`);
      activeTab.classList.add('active');
      activePanel.classList.add('active');
    }
  }
}

customElements.define('custom-tabs', CustomTabs);
export default CustomTabs;
