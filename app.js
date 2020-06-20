var lengthOfLongestSubstring = function (s) {
    let max = 0;
    let anz = 0
    let obj = {};
    for (let i = 0; i < s.length; i++) {
        if (!obj.hasOwnProperty(s[i])) {
            console.log('called')
            anz++;
            obj[s[i]] = 1
        } else {
            console.log('else')
            if (anz > max) {
                max = anz
            }
            anz = 0
            for (let member in obj) delete obj[member]
        }
    }
    if (anz > max) {
        max = anz
    }
    return max
};

// let obj = {}
// obj.a = 'b'
// console.log(obj)
// for (let member in obj) delete obj[member]
// console.log(obj.hasOwnProperty('a'))

// console.log(lengthOfLongestSubstring('aasda'))

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }

    setNextNode(node) {
        if (node instanceof Node || node === null) {
            this.next = node;
        } else {
            throw new Error('Next node must be a member of the Node class.');
        }
    }

    getNextNode() {
        return this.next;
    }
}

const node1 = new Node(5);
const node2 = new Node(node1);

console.log(node1)
console.log(node2)
node2.getNextNode();