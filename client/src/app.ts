import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('ts-app')
export class App extends LitElement {
  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  render() {
    return html`
      <section id="center">
        <h1 class="mea-culpa-regular">Trivia Break</h1>
        <div class="hero">
          <slot></slot>
        </div>
      </section>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ts-app': App
  }
}
