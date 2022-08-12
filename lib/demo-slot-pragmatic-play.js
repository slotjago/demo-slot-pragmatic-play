'use babel';

import DemoSlotPragmaticPlayView from './demo-slot-pragmatic-play-view';
import { CompositeDisposable } from 'atom';

export default {

  demoSlotPragmaticPlayView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.demoSlotPragmaticPlayView = new DemoSlotPragmaticPlayView(state.demoSlotPragmaticPlayViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.demoSlotPragmaticPlayView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'demo-slot-pragmatic-play:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.demoSlotPragmaticPlayView.destroy();
  },

  serialize() {
    return {
      demoSlotPragmaticPlayViewState: this.demoSlotPragmaticPlayView.serialize()
    };
  },

  toggle() {
    console.log('DemoSlotPragmaticPlay was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
