/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import { createActionHelpers } from 'vue-wait';

const tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};

function escapeHTML(str) {
  return str.replace(/[&<>]/g, tag => tagsToReplace[tag] || tag);
}

function genHighlight(text) {
  return `<span class="highlight-mask">${escapeHTML(text)}</span>`;
}

function getMaskedCharacters(text, _searchValue) {
  const searchValue = (_searchValue || '').toString().toLowerCase();
  const index = text.toLowerCase().indexOf(searchValue);

  if (index < 0) {
    return {
      start: '',
      middle: null,
      end: '',
    };
  }

  const start = text.slice(0, index);
  const middle = text.slice(index, index + searchValue.length);
  const end = text.slice(index + searchValue.length);
  return {
    start,
    middle,
    end,
  };
}
// extracted from vuetify source
export const highlightMatch = function (text, searchValue) {
  if (!searchValue) return escapeHTML(text);

  const { start, middle, end } = getMaskedCharacters(text, searchValue);

  if (!middle) return escapeHTML(text);

  return `${escapeHTML(start)}${genHighlight(middle)}${escapeHTML(end)}`;
};

// taken from david walsh Blog for now
// until we get a lib like lodash etc..
export const debounce = function (func, wait, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const isDebug = process.env.NODE_ENV !== 'production';

export const API_PREFIX = `${window.location.origin}/api`;

// export const { startLoading, endLoading } = createActionHelpers({
//   moduleName: 'loading',
// });

/**
 *  maps the given filters as componment methods
 * (similar to vuex mappers)
 * @param  {Array<String>} filters - names of the filters to map
 */
export function mapFilters(filters) {
  return filters.reduce((result, filter) => {
    result[filter] = function (...args) {
      return this.$options.filters[filter](...args);
    };
    return result;
  }, {});
}
