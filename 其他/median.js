// 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
// 请找出这两个有序数组的中位数。要求算法的时间复杂 度为 O(log(m+n))

const findMedianSortedArrays = function (nums1, nums2) {
    const len1 = nums1.length
    const len2 = nums2.length
    const middle = Math.ceil((len1 + len2 + 1) / 2)
    // 数组长度是否是偶数
    const isOddLen = (len1 + len2) % 2 === 0
    const result = []
    let i = 0 // nums1 的起始指针
    let j = 0 // nums2 的起始指针
    // 排序 push 到一个新的数组 result 中
    for (let k = 0; k < middle; k++) {
        if (i < len1 && j < len2) {
            if (nums1[i] < nums2[j]) {
                result[i + j] = nums1[i++]
            } else {
                result[i + j] = nums2[j++]
            }
        } else if (i < len1) {
            result[i + j] = nums1[i++]
        } else if (j < len2) {
            result[i + j] = nums2[j++]
        }
    }
    if (isOddLen) {
        return (result[middle - 1] + result[middle - 2]) / 2
    } else {
        return result[middle - 1]
    }
}

const num1 = [1, 2]
const num2 = [3, 4]
console.log(findMedianSortedArrays(num1, num2)) // 2.5