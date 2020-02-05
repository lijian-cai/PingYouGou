(function() {
    $(".select-all .cart-checkbox").click(function() {
        addBGColor(this, $(".item-full"))
        let checked = $(this).prop("checked")
        $(".cart-checkbox").prop("checked", checked)
    })
    $(".p-checkbox .cart-checkbox").click(function() {
        addBGColor(this, $(this).parents(".item-full"))
    })
    $(".increment").click(function() {
        let currVal = parseInt($(this).siblings("input").val())
        if (typeof currVal === 'number' && currVal % 1 === 0) {
            currVal++
            $(this).siblings("input").val(parseInt(currVal))
        } else {
            $(this).siblings("input").val(1)
        }
        updateSum(this, currVal)
        updateTotal()
    })
    $(".decrement").click(function() {
        let currVal = parseInt($(this).siblings("input").val())
        if (typeof currVal === 'number' && currVal % 1 === 0) {
            currVal--
            currVal - 1 > 0 ? $(this).siblings("input").val(parseInt(currVal)) : $(this).siblings("input").val(1)
        }
        updateSum(this, currVal)
        updateTotal()

    })
    $(".p-quantity input").change(function() {
        let currVal = parseInt($(this).val())
        if (typeof currVal === 'number' && currVal % 1 === 0) {
            updateSum(this, currVal)
            $(this).val(currVal)
            updateTotal()
        }
    })
}());

function updateSum(_this, currVal) {
    let price = $(_this).parents(".p-quantity").siblings(".p-price").find("strong").text().substr(1)
    let total = currVal * price
    $(_this).parents(".p-quantity").siblings(".p-sum").find("strong").html(`￥${total.toFixed(2)}`)
}

function updateTotal() {
    let total = 0
    $(".p-sum strong").each(function(index, element) {
        let currSum = parseFloat($(element).text().substr(1))
        console.log(typeof currSum)
        total += currSum
    })
    $(".price-sum em").html(`￥${total.toFixed(2)}`)
}

function addBGColor(_this, _target) {
    if ($(_this).prop("checked")) {
        _target.addClass("item-selected")
    } else {
        _target.removeClass("item-selected")
    }
}