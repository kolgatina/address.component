/**
 * Установить название магазина
 */
function setStoreName(store) {
    $('#address-line-pickup .store-name').text(store);
    chooseAddressLineLook('P');
}

/**
 * Установить внешний вид формы: ввод адреса или выбор магазина
 * @param type тип доставки (D/P)
 */
function chooseAddressLineLook(type) {
    if (type == 'D') {
        $('#address-line-pickup').hide();
        $('#address-line-delivery').show();
    } else if (type == 'P') {
        $('#address-line-delivery').hide();
        $('#address-line-pickup').show();
    }
}

/**
 * Установить внешний вид input'а с улицей.
 * Если есть подсказка о местности, то название улицы смещается вниз.
 * Если нет подсказки о местности, то название улицы по центру
 */
function setStreetStyle() {
    if ($('.address-line-prompt').html().length > 0) {
        $('.address-line-street').addClass('street-with-prompt');
    } else {
        $('.address-line-street').removeClass('street-with-prompt');
    }

    if ($('.address-line-street').val().length > 0) {
        $('.street-delete').show();
    } else {
        $('.street-delete').hide();
    }
}

/**
 * Очистить значение улицы (плюс всю сопутствующую информацию) и дома
 */
function cleanStreetValue() {
    $('.address-line-street').val('');
    $('.address-point-lat').val('-1');
    $('.address-point-lon').val('-1');
    $('.address-line-prompt').html('');
    $('.address-line-house').val('');

    if ($('.address-line-info').is(':visible')) {
        $('.address-line-info').hide();
    }

    setStreetStyle();
}

/**
 * Очистить значение дома
 */
function cleanHouseValue() {
    $('.address-line-house').val('');
    setStreetStyle();
}

/**
 * Свернуть условия доставки
 */
function rollUpDeliveryInfo() {
    if ($('.roll-down-address-line-info').is(':visible')) {
        $('.roll-down-address-line-info').hide();
        $('.roll-up-address-line-info').show();
    }
}

/**
 * Развернуть условия доставки
 */
function rollDownDeliveryInfo() {
    if (!$('.roll-down-address-line-info').is(':visible')) {
        $('.roll-down-address-line-info').show();
        $('.roll-up-address-line-info').hide();
    }
}

/**
 * Проверить, есть ли адрес в куках. Если есть, вывести условия доставки.
 */
function checkIfAddressSet() {
    var tmp = getCookie('PERSONAL_DELIVERY_INFO');
    if (typeof(tmp) !== 'undefined') {
        var cookie = JSON.parse(tmp);
        if (typeof(cookie['DATA']) !== 'undefined' && cookie['DATA']['id_delivery'] == 'D') {
            chooseAddressLineLook('D');
            if (typeof(cookie['ZONE']) !== 'undefined' && !!cookie['ZONE'] && typeof(cookie['ZONE']['length']) == 'undefined') {
                setDeliveryMessage(cookie['ZONE']);
                if (!!cookie['DATA']['area'] && cookie['DATA']['area'].length > 0) {
                    $('.address-line-prompt').html(cookie['DATA']['area'].replace(/\+/g, ' '));
                }
            }
            setStreetStyle();
        } else if (cookie['DATA']['id_delivery'] == 'P' && typeof(cookie['DATA']['store']) !== 'undefined') {
            if (!!cookie['DATA']['store']['name']) {
                $('.selected-store-name').text(cookie['DATA']['store']['name'].replace(/\+/g, ' '));
            }
            if (!!cookie['DATA']['store']['address']) {
                $('.selected-store-address').text(cookie['DATA']['store']['address'].replace(/\+/g, ' '));
            }
            chooseAddressLineLook('P');
        } else {
            chooseAddressLineLook('D');
        }
    } else {
        chooseAddressLineLook('D');
    }
}

/**
 * Получить информацию о зоне доставки
 */
function getZoneInfo() {
    var lon = $('.address-point-lon').val();
    var lat = $('.address-point-lat').val();
    $.ajax({
        url: '/ajax/',
        dataType: 'json',
        async: false,
        data: {
            'city': $('.address-line-city').val(),
            'id_delivery': 'D',
            'street': $('.address-line-street').val(),
            'house': $('.address-line-house').val(),
            'area': $('.address-line-area').val(),
            'point': {
                'lat': lat,
                'lon': lon
            }
        }
    }).success(function (data) {
        setDeliveryMessage(data);
    })
}

/**
 * Установить условия доставки
 * @param object ответ о зоне доставки
 */
function setDeliveryMessage(data) {
    $('.address-line-info').show();
    rollDownDeliveryInfo();

    if (!data['ERROR_CODE']) {
        $okBlock = $('.address-ok');

        // проверить, есть платная доставка или нет
        if (data['BaseCost'] > 0) {
            $okBlock.find('.pay-zone-price').text(data['PayCost']);
            $okBlock.find('.total-zone-price').text(data['DeliveryCost'] + data['DeliveryCost']);
            $('.address-ok-block.pay-zone').show();
            $('.address-ok-block.free-zone').hide();
        } else {
            $('.address-ok-block.pay-zone').hide();
            $('.address-ok-block.free-zone').show();
        }

        $okBlock.find('.price').text(data['Price']);
        $okBlock.find('.time').text(data['Time']);
        $okBlock.find('.delivery-price').text(data['DeliveryCost']);

        $('.roll-down-address-line-info').children().hide();
        $okBlock.show();
    } else {
        $('.roll-down-address-line-info').children().hide();
        $('.address-nope').show();
    }
}

$(document).ready(function () {
    checkIfAddressSet();

    var houseVal = '';
    $('.address-line-house').blur (function () {
        if ($('.address-line-house').val() != houseVal) {
            houseVal = $('.address-line-house').val();
            setTimeout(getZoneInfo, 1000);
        }
    });

    $('.search-results-list').click (function () {
        setStreetStyle();
        $('.address-line-house').focus();
    });

    $('.street-delete').click (function () {
        cleanStreetValue();
    });

    $('.address-line-street').change (function () {
        houseVal = '';
        cleanHouseValue();
    });

    $('#address-line-pickup a').click (function () {
        chooseAddressLineLook('D');
    });

    $(window).scroll (function() {
        rollUpDeliveryInfo();
    });

    $('.roll-up-address-line-info').click (function () {
        rollDownDeliveryInfo();
    });
});