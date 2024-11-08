const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Untuk file statis

// Penghitungan Faktorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Deret Fibonacci
function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Pencarian Biner
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1; // Target tidak ditemukan
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) return binarySearch(arr, target, mid + 1, right);
    return binarySearch(arr, target, left, mid - 1);
}

// Traversal Pohon (In-Order)
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function inOrderTraversal(node, result = []) {
    if (node) {
        inOrderTraversal(node.left, result);
        result.push(node.value);
        inOrderTraversal(node.right, result);
    }
    return result;
}

// Permutasi
function permute(arr) {
    if (arr.length === 0) return [[]];
    const first = arr[0];
    const rest = arr.slice(1);
    const permsWithoutFirst = permute(rest);
    const allPerms = [];
    
    permsWithoutFirst.forEach(perm => {
        for (let i = 0; i <= perm.length; i++) {
            const permWithFirst = [...perm.slice(0, i), first, ...perm.slice(i)];
            allPerms.push(permWithFirst);
        }
    });
    
    return allPerms;
}

// Masalah Tower of Hanoi
function towerOfHanoi(n, fromRod, toRod, auxRod, result = []) {
    if (n === 1) {
        result.push(`Pindahkan cakram 1 dari ${fromRod} ke ${toRod}`);
        return result;
    }
    towerOfHanoi(n - 1, fromRod, auxRod, toRod, result);
    result.push(`Pindahkan cakram ${n} dari ${fromRod} ke ${toRod}`);
    towerOfHanoi(n - 1, auxRod, toRod, fromRod, result);
    return result;
}

// Halaman utama
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Endpoint untuk menghitung faktorial
app.post('/factorial', (req, res) => {
    const num = parseInt(req.body.number);
    const result = factorial(num);
    res.send(`Faktorial dari ${num} adalah: ${result}`);
});

// Endpoint untuk menghitung Fibonacci
app.post('/fibonacci', (req, res) => {
    const num = parseInt(req.body.number);
    const result = fibonacci(num);
    res.send(`Fibonacci ke-${num} adalah: ${result}`);
});

// Endpoint untuk pencarian biner
app.post('/binary-search', (req, res) => {
    const arr = req.body.array.split(',').map(Number);
    const target = parseInt(req.body.target);
    const index = binarySearch(arr, target);
    res.send(`Index dari ${target} adalah: ${index !== -1 ? index : 'Tidak ditemukan'}`);
});

// Endpoint untuk traversal pohon
app.post('/inorder-traversal', (req, res) => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    const result = inOrderTraversal(root);
    res.send(`Traversal In- Order: ${result.join(', ')}`);
});

// Endpoint untuk permutasi
app.post('/permutation', (req, res) => {
    const arr = req.body.elements.split(',').map(item => item.trim());
    const result = permute(arr);
    res.send(`Permutasi: ${JSON.stringify(result)}`);
});

// Endpoint untuk Tower of Hanoi
app.post('/tower-of-hanoi', (req, res) => {
    const num = parseInt(req.body.disks);
    const result = towerOfHanoi(num, 'A', 'C', 'B');
    res.send(`Langkah-langkah Tower of Hanoi:\n${result.join('\n')}`);
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});