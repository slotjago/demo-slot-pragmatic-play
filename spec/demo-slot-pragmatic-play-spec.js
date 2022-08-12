'use babel';

import DemoSlotPragmaticPlay from '../lib/demo-slot-pragmatic-play';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('DemoSlotPragmaticPlay', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('demo-slot-pragmatic-play');
  });

  describe('when the demo-slot-pragmatic-play:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.demo-slot-pragmatic-play')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'demo-slot-pragmatic-play:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.demo-slot-pragmatic-play')).toExist();

        let demoSlotPragmaticPlayElement = workspaceElement.querySelector('.demo-slot-pragmatic-play');
        expect(demoSlotPragmaticPlayElement).toExist();

        let demoSlotPragmaticPlayPanel = atom.workspace.panelForItem(demoSlotPragmaticPlayElement);
        expect(demoSlotPragmaticPlayPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'demo-slot-pragmatic-play:toggle');
        expect(demoSlotPragmaticPlayPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.demo-slot-pragmatic-play')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'demo-slot-pragmatic-play:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let demoSlotPragmaticPlayElement = workspaceElement.querySelector('.demo-slot-pragmatic-play');
        expect(demoSlotPragmaticPlayElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'demo-slot-pragmatic-play:toggle');
        expect(demoSlotPragmaticPlayElement).not.toBeVisible();
      });
    });
  });
});
