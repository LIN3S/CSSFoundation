/*
 * This file is part of the Front Foundation package.
 *
 * Copyright (c) 2017-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */

import * as Patterns from './../patterns/patterns';

const VALIDATOR_TYPE = {
  CHECKBOX: 'CHECKBOX',
  PATTERN: 'PATTERN'
};

const
  setDataValidationPatternAttribute = (formElementDomNode, pattern) => {
    formElementDomNode.setAttribute('data-validate-pattern', pattern);
  },
  preProcessFormElementValidationPattern = formElementDomNode => {
    const
      builtInValidationPatternsKeys = ['email', 'phone', 'any'],
      needsPreProcessing = builtInValidationPatternsKeys.some(key =>
        formElementDomNode.hasAttribute(`data-validate-${key}`));

    if (needsPreProcessing) {
      if (formElementDomNode.hasAttribute('data-validate-email')) {
        setDataValidationPatternAttribute(formElementDomNode, Patterns.email);
      } else if (formElementDomNode.hasAttribute('data-validate-phone')) {
        setDataValidationPatternAttribute(formElementDomNode, Patterns.phone);
      } else {
        setDataValidationPatternAttribute(formElementDomNode, Patterns.any);
      }
    }
  },
  getFormElementValidatorType = formElementDomNode => {
    if (formElementDomNode.getAttribute('type') === 'checkbox') {
      return VALIDATOR_TYPE.CHECKBOX;
    } else if (formElementDomNode.hasAttribute('data-validate-pattern')) {
      return VALIDATOR_TYPE.PATTERN;
    }
  };

export {
  VALIDATOR_TYPE,
  preProcessFormElementValidationPattern,
  getFormElementValidatorType
};
