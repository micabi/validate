$(document).ready(function(){

	var flag = 0;

	// お名前
	$('[name=name]').on('blur', function(){
		nameCheck();
	});

	// フリガナ
	$('[name=kana]').on('blur', function(){
		kanaCheck();
	});

	// 電話番号
	$('[name="tel"]').on('blur', function(){
		telCheck();
		flag = 0;
	});

	// メールアドレス
	$('[name=mail]').on('blur', function(){
		mailCheck();
		flag = 0;
	});

	// 郵便番号
	$('[name=zip]').on('blur', function(){
		zipCheck();
		flag = 0;
	});

	// 住所
	$('[name=address]').on('blur', function(){
		addressCheck();
		flag = 0;
	});

	// 性別
	$('[name=sex]').on('blur', function(){
		sexCheck();
		flag = 0;
	});

	// 年代
	$('[name=old]').on('blur', function(){
		oldCheck();
		flag = 0;
	});

		// テキストエリア文字数カウント
		$('p.length').text('0');

		$('[name=comment]').on('keyup', function(){
			var text = $('[name=comment]').val();
			var textlength = text.length;

			$('p.length').text(textlength);

			if (textlength >= 50) {
				$('p.length').css({
					'color': 'red'
				});
			}
		});

		$('[name=comment]').on('blur', function(){
			$('p.length').css({
				'color': '#000'
			});

			commentCheck();
			flag = 0;
		});

// リセットボタン
		$('input:button').on('click', function(){
			clearAll();
		});

// 送信ボタン
		$('form#form').on('submit', function(){
			nameCheck();
			kanaCheck();
			telCheck();
			mailCheck();
			zipCheck();
			addressCheck();
			sexCheck();
			oldCheck();
			commentCheck();
			//console.log(flag + "件の未入力があります。");

			if (flag > 0) {
				alert(flag + "件の未記入の項目、または形式が適切でない項目があります。");
				flag = 0; // 0に戻さないとflagの値が貯まっていく
				return false;
			}else{
				$(this).off('submit'); // okの時でも1度イベント解除する
				alert("送信されました。");
				$('form#form').submit();
			}

			// これではスタックオーバーフローを起こす。
			/*
			if(!nameCheck || !kanaCheck || !telCheck || !mailCheck || !zipCheck || !sexCheck || !oldCheck || !commentCheck){}

			*/

});

/******************************
関数定義
******************************/

		function nameCheck(){
			var alertName = "お名前は入力必須項目です。";
			var yourName = $('[name=name]').val();
			if (yourName === "" || yourName.match(/^[ 　\r\n\t]*$/)) {
				$('[name=name]').prev('span.alert').text(alertName);
				flag++;
				return false;
			}else{
				$('[name=name]').prev('span.alert').text("");

			}
		}

		function kanaCheck(){
				var alertKana = "全角カタカナで記入して下さい。";
				var yourKana = $('[name=kana]').val();
				yourKana = yourKana.replace(/[\n\s ]/g, '');

				if (yourKana === "" || yourKana.match(/^[ 　\r\n\t]*$/)) {
					$('[name=kana]').prev('span.alert').text("記入して下さい。");
					flag++;
					return false;
				}else if(!yourKana.match(/^[ァ-ン]*$/)) {
					$('[name=kana]').prev('span.alert').text(alertKana);
					flag++;
					return false;
				}else{
					$('[name=kana]').prev('span.alert').text("");
				}
			}

		function telCheck(){
				var alertTel = "電話番号は10桁または11桁の数字で記入して下さい。";
				var yourTel = $('[name="tel"]').val();
				yourTel = yourTel.replace(/[\n\s ]/gi, '');
				yourTel = yourTel.replace(/[━.*‐.*―.*－.*\–.*ー.*\-]/gi,'');
				var formatTel = yourTel.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0);});
				formatTel = $.trim(formatTel);

				if (formatTel.length < 10 || formatTel.length > 11 || formatTel === "") {
					$('[name="tel"]').prev('span.alert').text(alertTel);
					flag++;
					return false;
				}else{
					$('[name="tel"]').val(formatTel);
					$('[name="tel"]').prev('span.alert').text("");
				}
			}

		function mailCheck(){
				var alertMail = "メールアドレスの形式ではありません。入力必須項目です。";
				var yourMail = $('[name=mail]').val();
				yourMail = yourMail.replace(/[\n\s ]/gi, '');

				if (!yourMail.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) {
					$('[name=mail]').prev('span.alert').text(alertMail);
					flag++;
					return false;
				}else{
					$('[name=mail]').prev('span.alert').text("");
				}
			}

		function zipCheck(){
				var alertZip = "郵便番号は7桁の数字で記入して下さい。";
				var yourZip = $('[name=zip]').val();
				yourZip = yourZip.replace(/[━.*‐.*―.*－.*\–.*ー.*\-]/gi,'');
				yourZip = yourZip.replace(/[\n\s ]/gi, ''); // スペース、改行を除去
				var formatZip = yourZip.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0);});

				if (formatZip.length != 7 || formatZip.match(/^[ 　\r\n\t]*$/)) {
					$('[name=zip]').prev('span.alert').text(alertZip);
					flag++;
					return false;
				}else{
					$('[name=zip]').val(formatZip);
					$('[name=zip]').prev('span.alert').text("");
				}
			}

		function addressCheck(){
			var alertAddress = "入力必須項目です。";
			var yourAddress = $('[name=address]').val();
			yourAddress.replace(/\s/g, "");
			//console.log(yourAddress);
			var formatAddress = yourAddress.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0);});
			formatAddress = formatAddress.replace(/[━.*‐.*―.*－.*\–.*ー.*\-]/gi,'-');
			//console.log(formatAddress);

			if (formatAddress === "" || formatAddress.match(/^[ 　\r\n\t]*$/)) {
				$('[name=address]').prev('span.alert').text(alertAddress);
				flag++;
				return false;
			}else{
				$('[name=address]').val(formatAddress);
				$('[name=address]').prev('span.alert').text("");
			}
		}

		function sexCheck(){
				var alertSex = "1つ選択して下さい。";
				var yourSex = $('[name=sex]:checked').val();
				if (yourSex === undefined) {
					$('.alertsex').text(alertSex);
					flag++;
					return false;
				}else{
					$('.alertsex').text("");
				}
			}

		function oldCheck(){
				var alertOld = "1つ選択して下さい。";
				var yourOld = $('[name=old]').val();
				if (yourOld === null) {
					$('[name=old]').prev('span.alert').text(alertOld);
					flag++;
					return false;
				}else if(yourOld === ""){
					$('[name=old]').prev('span.alert').text(alertOld);
					flag++;
					return false;
				}else{
					$('[name=old]').prev('span.alert').text("");
				}
			}

		function commentCheck(){
				var alertComment = "コメントは入力必須項目です。";
					if ($('[name=comment]').val() === "" || $('[name=comment]').val().match(/^[ 　\r\n\t]*$/)) {
						$('[name=comment]').prev('span.alert').text(alertComment);
						flag++;
						return false;
					}else{
						$('[name=comment]').prev('span.alert').text("");
					}

					if ($('[name=comment]').val().length > 50) {
						$('[name=comment]').prev('span.alert').text("50文字以内で記入して下さい。");
						flag++;
						return false;
					}
			}

			function clearAll(){
				var myForm = $('#form');
				myForm.find(':text, select, textarea, radio, checkbox').val("").end().find(':checked').prop('checked', false);
				// #formの子要素全てからtype=text, radio, select, textarea, checkboxを見つけてvalue=""にして、
				// もう一度#formに戻り、全ての子要素から:checedになっているものを外す。
				$('p.length').text("0");
				myForm.find('span.alert, span.alertsex').text("");
				flag = 0;
			}
});