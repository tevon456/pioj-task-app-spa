/**
 * tiny array of object utils.
 */
export default class TinyDansk {
  /**
   * select one or more objects that match a query in array
   * @param {object[]} from - array containing objects
   * @param {string} where - attribute to select
   * @param {any} value - value to search for on attribute
   */
  static selectObjectFromArray(from = [], where, isValue) {
    return from.filter((obj) => {
      return obj[where] === isValue;
    });
  }

  /**
   * delete an object from array and return updated array
   * @param {object[]} from - array containing objects
   * @param {string} where - attribute to select
   * @param {any} value - value to search for on attribute
   */
  static deleteObjectFromArray(from = [], where, isValue) {
    let operationObject = this.selectObjectFromArray(from, where, isValue);
    let index = from.indexOf(operationObject[0]);

    let clonedFrom = [...from];
    clonedFrom.splice(index, 1);

    return clonedFrom;
  }

  /**
   * update an object from array and return updated array
   * @param {object[]} from - array containing objects
   * @param {string} where - attribute to select
   * @param {any} value - value to search for on attribute
   * @param {any} update - value to insert
   */
  static updateObjectFromArray(from = [], where, isValue, update) {
    let operationObject = this.selectObjectFromArray(from, where, isValue);
    let index = from.indexOf(operationObject[0]);

    let clonedFrom = [...from];
    clonedFrom.splice(index, 1, update);

    return clonedFrom;
  }

  /**
   * information about a array's index
   * @param {array} array - array to search
   * @param {number} index - index of array to return information about
   */
  static indexDetails(array, index) {
    let details = {};
    details.length = array.length;
    details.index = index;
    details.lastIndex = array.length - 1;
    if (index === 0) {
      details.previousIndex = null;
    } else if (index === details.lastIndex && array.length > 1) {
      details.previousIndex = index - 1;
    } else {
      details.previousIndex = index - 1;
    }
    if (index === details.lastIndex) {
      details.nextIndex = null;
    } else if (index === 0 && array.length > 1) {
      details.nextIndex = index + 1;
    } else {
      details.nextIndex = index + 1;
    }
    return details;
  }

  /**
   * Move an array item using indexes
   * @param {array} arr - array containing values to be moved
   * @param {number} old_index - the original index of array item
   * @param {number} new_index - target index to move array item to
   */
  static moveArrayEntry(arr, old_index, new_index) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      let k = new_index - arr.length;
      while (k-- + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }
}
