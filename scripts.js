//Node Class
class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
//Tree Class
class Tree {
  constructor(arr) {
    this.root = this.buildTree(this.processArray(arr));
  }
  processArray(arr) {
    // Sort the array and remove duplicates
    return [...new Set(arr.sort((a, b) => a - b))];
  }

  buildTree(nums) {
    if (nums.length === 0) {
      return null;
    }

    const mid = Math.floor(nums.length / 2);
    const root = new Node(nums[mid]);
    root.left = this.buildTree(nums.slice(0, mid));
    root.right = this.buildTree(nums.slice(mid + 1));

    return root;
  }
  insert(value) {
    const newNode = new Node(value);
    this.root = this.insertNode(this.root, newNode);
  }

  insertNode(root, newNode) {
    if (root === null) {
      return newNode; // Insert the new root at the empty position
    }

    if (newNode.val < root.val) {
      root.left = this.insertNode(root.left, newNode);
    } else if (newNode.val > root.val) {
      root.right = this.insertNode(root.right, newNode);
    } else {
      return root;
    }

    return root;
  }

  delete(value, root = this.root) {
    if (root === null) {
      return null;
    }

    if (value < root.val) {
      root.left = this.delete(value, root.left);
    } else if (value > root.val) {
      root.right = this.delete(value, root.right);
    } else {
      // Node found, perform deletion

      // Case 1: No children
      if (root.left === null && root.right === null) {
        return null;
      }

      // Case 2: One child
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      // Case 3: Two children
      const inorderSuccessor = this.getMinNode(root.right);
      root.val = inorderSuccessor.val;
      root.right = this.delete(inorderSuccessor.val, root.right);
    }

    return root;
  }

  // Helper function to find the inorder successor
  getMinNode(root) {
    console.log(root);
    let current = root;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  find(value, root = this.root) {
    if (root === null) {
      return null;
    }
    if (value < root.val) {
      return this.find(value, root.left);
    } else if (value > root.val) {
      return this.find(value, root.right);
    } else {
      console.log(root);
      return root;
    }
  }

  levelOrder(callback = () => {}) {
    if (this.root === null) {
      return []; // Empty tree
    }

    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current);
      result.push(current.val);

      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }

    return result;
  }

  inOrder(node = this.root, callback = null) {
    const values = [];

    function traverse(node) {
      if (node === null) return;
      // Visit left subtree
      traverse(node.left);
      // Visit node itself
      if (callback) {
        callback(node.val);
      } else {
        values.push(node.val);
      }
      // Visit right subtree
      traverse(node.right);
    }

    traverse(node);

    if (!callback) {
      return values;
    }
  }

  preOrder(node = this.root, callback = null) {
    const values = [];

    function traverse(node) {
      if (node === null) return;

      if (callback) {
        callback(node.val);
      } else {
        values.push(node.val);
      }

      traverse(node.left);

      traverse(node.right);
    }

    traverse(node);

    if (!callback) {
      return values;
    }
  }

  postOrder(node = this.root, callback = null) {
    const values = [];

    function traverse(node) {
      if (node === null) return;

      traverse(node.left);

      traverse(node.right);

      if (callback) {
        callback(node.val);
      } else {
        values.push(node.val);
      }
    }

    traverse(node);

    if (!callback) {
      return values;
    }
  }

  height(value) {
    const node = this.search(value);
    if (node !== null) {
      return this.calculateHeight(node);
    } else {
      return null;
    }
  }

  calculateHeight(node) {
    if (node === null) {
      return -1;
    }
    const leftHeight = this.calculateHeight(node.left);
    const rightHeight = this.calculateHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  search(value) {
    console.log();
    return this.searchNode(this.root, value);
  }

  searchNode(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.val) {
      return this.searchNode(node.left, value);
    } else if (value > node.val) {
      return this.searchNode(node.right, value);
    } else {
      return node; //Node found
    }
  }

  depth(value, node = this.root, currentDepth = 0) {
    if (node === null) {
      return -1;
    }

    if (value === node.val) {
      console.log("depth = " + currentDepth);
      return currentDepth;
    } else if (value > node.val) {
      return this.depth(value, node.right, currentDepth + 1);
    } else {
      return this.depth(value, node.left, currentDepth + 1);
    }
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true; // A null tree is balanced.
    }

    let leftHeight = this.calculateHeight(node.left);
    let rightHeight = this.calculateHeight(node.right);

    let isCurrentNodeBalanced = Math.abs(leftHeight - rightHeight) <= 1;

    return (
      isCurrentNodeBalanced &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalanceTree() {
    let newTreeArray = [];
    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      newTreeArray.push(node.val);
      traverse(node.right);
    }

    traverse(this.root); // newTree now contains an array of the values from the tree.
    console.log(newTreeArray);
    this.root = this.buildTree(newTreeArray);
  }
}

// function to print the tree in a structured format
const prettyPrint = (root, prefix = "", isLeft = true) => {
  if (root !== null) {
    if (root.right !== null) {
      prettyPrint(root.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${root.val}`);
    if (root.left !== null) {
      prettyPrint(root.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
};

// Driver script

const driverData = Array.from({ length: 15 }, () =>
  Math.floor(Math.random() * 50)
);

const tree = new Tree(driverData);
prettyPrint(tree.root);
console.log("Tree is balanced? : ", tree.isBalanced());
console.log("level order: ", tree.levelOrder());
console.log("pre order: ", tree.preOrder());
console.log("post order: ", tree.postOrder());
console.log("in order: ", tree.inOrder());
const valuesToInsert = [7, 11, 13];
console.log("insert 7, 11, and 13");
valuesToInsert.forEach((value) => tree.insert(value));
prettyPrint(tree.root);
console.log("Tree still balanced? : ", tree.isBalanced());
console.log("rebalance tree");
tree.rebalanceTree();
console.log("Tree back to balanced? : ", tree.isBalanced());
prettyPrint(tree.root);
console.log("level order: ", tree.levelOrder());
console.log("pre order: ", tree.preOrder());
console.log("post order: ", tree.postOrder());
console.log("in order: ", tree.inOrder());

/*
// Example usage
const treeData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
/*const treeData = Array.from({ length: 15 }, () =>
  Math.floor(Math.random() * 50)
);
*/
/*
const tree = new Tree(treeData);
prettyPrint(tree.root);
console.log(tree);

tree.delete(3);
console.log("delete 3 and insert 11.");
tree.insert(11);
tree.insert(2);

prettyPrint(tree.root);

tree.find(7);
console.log("breadth-first level order:");
tree.levelOrder();
console.log("inOrder: ");
tree.inOrder();
console.log("preOrder");
tree.preOrder();
console.log("postOrder");
tree.postOrder();
console.log("tree height", tree.height(11));
*/
