import { useState, useMemo } from 'react';
import Field from '@alifd/field';

import { scrollToFirstError, cloneAndAddKey, log } from './utils';

class NextField extends Field {
    static useField(options = {}) {
        return this.getUseField({ useMemo, useState })(options);
    }

    constructor(com, options = {}) {
        const newOptions = Object.assign({}, options, {
            afterValidateRerender: scrollToFirstError,
            processErrorMessage: cloneAndAddKey,
        });
        super(com, newOptions);
    }

    validate(ns, cb) {
        this.validateCallback(ns, cb);
    }

    reset(ns, backToDefault = false) {
        if (ns === true) {
            log.deprecated('reset(true)', 'resetToDefault()', 'Field');
            this.resetToDefault();
        } else if (backToDefault === true) {
            log.deprecated('reset(ns,true)', 'resetToDefault(ns)', 'Field');
            this.resetToDefault(ns);
        } else {
            this._reset(ns, false);
        }
    }
}

export default NextField;
