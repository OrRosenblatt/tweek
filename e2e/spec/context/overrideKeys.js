/* global describe, before, after, it, browser */

import ContextPageObject from '../../utils/ContextPageObject';
import contextSelectors from '../../selectors/contextSelectors';
import { expect } from 'chai';
import { diff } from 'deep-diff';
import Chance from 'chance';

const chance = new Chance();

describe('override keys', () => {
  const contextPageObject = new ContextPageObject(browser);
  const contextId = chance.guid();
  const contextType = 'user';
  const typedKey = '@behavior_tests/@context/override_key';

  before(() => {
    contextPageObject.goToBase();
  });

  it('should modify override keys', () => {
    contextPageObject.openContext(contextType, contextId);

    const fixedKeys = {
      'some/key': 'someValue',
      [typedKey]: 5,
    };

    for (const key in fixedKeys) {
      contextPageObject.addOverrideKey(key, fixedKeys[key]);
      browser.click(contextSelectors.ADD_KEY_BUTTON);
    }

    contextPageObject.saveChanges();

    let currentContext = contextPageObject.getOverrideKeys(contextType, contextId);
    let diffs = diff(currentContext, fixedKeys);
    expect(diffs).to.equal(undefined, 'contextData is not as expected. diffs are:' + JSON.stringify(diffs));

    const updatedKeys = {
      'some/key': 'newValue',
      'some/new/key': 'anotherValue',
    };

    browser.click(contextSelectors.keyDeleteButton(typedKey));
    browser.setValue(contextSelectors.keyValueInput('some/key'), 'newValue');
    browser.click(contextSelectors.ADD_KEY_BUTTON);
    contextPageObject.addOverrideKey('some/new/key', 'anotherValue');

    contextPageObject.saveChanges();

    currentContext = contextPageObject.getOverrideKeys(contextType, contextId);
    diffs = diff(currentContext, updatedKeys);
    expect(diffs).to.equal(undefined, 'contextData is not as expected. diffs are:' + JSON.stringify(diffs));
  });
});
