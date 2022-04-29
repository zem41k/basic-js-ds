const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.top = null;
  }

  root() {
    return this.top;
  }

  add(data) {
    this.top = addNode(this.top, data);

    function addNode(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addNode(node.left, data);
      }
      if (data > node.data) {
        node.right = addNode(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    function searchData(node, data) {
      if (!node) return false;
      if (node.data === data) return true;
      return data < node.data ? searchData(node.left, data) : searchData(node.right, data);
    }
    return searchData(this.top, data);
  }

  find(data) {
    function searchNode(node, data) {
      if (!node) return null;
      if (node.data === data) return node;
      return data < node.data ? searchNode(node.left, data) : searchNode(node.right, data);
    }
    return searchNode(this.top, data);
  }

  remove(data) {
    this.top = removeNode(this.top, data);
    function removeNode(node, data) {
      if (!node) return null;
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        let maxFromLeft = node.left;
        while (maxFromLeft.right) {
          maxFromLeft = maxFromLeft.right;
        }
        node.data = maxFromLeft.data;
        node.left = removeNode(node.left, maxFromLeft.data)
        return node;
      }
    }
  }

  min() {
    return findMin(this.top);

    function findMin(node) {
      if (!node.left) {
        return node.data;
      } else {
        return findMin(node.left);
      }
    }
  }

  max() {
    return findMax(this.top);

    function findMax(node) {
      if (!node.right) {
        return node.data;
      } else {
        return findMax(node.right);
      }
    }
  }
}

module.exports = {
  BinarySearchTree
};