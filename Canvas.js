class Canvas{
	/**
	 * Canvasを作成します。
	 * @param {number} width Canvasの幅
	 * @param {number} height Canvasの高さ
	 * @param {object} options オプション(デフォルト: `{}`)
	 */
	constructor(width, height, options = {}){
		this._canvas = document.createElement('canvas');
		this._canvas.width = width;
		this._canvas.height = height;
		this._context = this._canvas.getContext('2d');
		this._usePositionFix = (options.usePositionFix != null ? options.usePositionFix : true);
		this._context.textAlign = 'left';
		this._context.textBaseline = 'top';
		this._fontDecorations = [];
		this._fontSize = '10px';
		this._fontFamily = 'sans-serif';
	}

	/**
	 * Canvasの要素を返します。
	 * @return {HTMLCanvasElement} Canvasの要素
	 */
	getElement(){
		return this._canvas;
	}

	/**
	 * Canvasのコンテキストを返します。
	 * @return {CanvasRenderingContext2D} Canvasのコンテキスト
	 */
	getContext(){
		return this._context;
	}

	/**
	 * Canvasの幅を返します。
	 * @return {number} Canvasの幅
	 */
	getWidth(){
		return this._canvas.width;
	}

	/**
	 * Canvasの高さを返します。
	 * @return {number} Canvasの高さ
	 */
	getHeight(){
		return this._canvas.height;
	}

	_refreshFont(){
		this._context.font = `${this._fontDecorations.join(' ')} ${this._fontSize} "${this._fontFamily}"`;
	}

	/**
	 * フォントの大きさを変更します。
	 * @param {number} size フォントの大きさ(px)
	 */
	setFontSize(size){
		this._fontSize = `${size}px`;
		this._refreshFont();
	}

	/**
	 * フォントファミリを変更します。
	 * @param {string} fontFamily フォントファミリ名
	 */
	setFontFamily(fontFamily){
		this._fontFamily = fontFamily;
		this._refreshFont();
	}

	/**
	 * フォントの装飾を配列で指定します。  
	 * 引数を省略した場合は現在の装飾を削除します。  
	 * decorationsの例: `['bold', 'italic']`
	 * @param {Array} decorations 装飾の配列(デフォルト: `[]`)
	 */
	setFontDecorations(decorations = []){
		this._fontDecorations = [...decorations];
		this._refreshFont();
	}

	/**
	 * フォントファミリ、サイズ、装飾を一括で変更します。  
	 * 引数を省略するか`null`を指定した場合は変更されません。
	 * @param {string} fontFamily フォントファミリ名(デフォルト: `null`)
	 * @param {number} size フォントの大きさ(px)(デフォルト: `null`)
	 * @param {Array} decorations 装飾の配列(デフォルト: `null`)
	 */
	setFont(fontFamily = null, size = null, decorations = null){
		if(fontFamily !== null)this._fontFamily = fontFamily;
		if(size !== null)this._fontSize = `${size}px`;
		if(decorations !== null)this._fontDecorations = [...decorations];
		this._refreshFont();
	}

	/**
	 * テキスト描画の水平方向の配置を変更します。  
	 * alignに指定できる文字列は`start`,`end`,`left`,`center`,`right`です。
	 * @param {string} align テキストの水平位置
	 */
	setTextAlign(align){
		this._context.textAlign = align;
	}

	/**
	 * テキスト描画の垂直方向の配置を変更します。  
	 * baselineに指定できる文字列は`top`,`middle`,`bottom`,`hanging`,`alphabetic`,`ideographic`です。
	 * @param {string} baseline テキストの垂直位置
	 */
	setTextBaseline(baseline){
		this._context.textBaseline = baseline;
	}

	/**
	 * 線の太さを変更します。
	 * @param {number} width 線の太さ
	 */
	setLineWidth(width){
		this._context.lineWidth = width;
	}

	/**
	 * 線を描画します。  
	 * colorを省略するか`null`を指定した場合は直前に使用された色が使われます。
	 * @param {nuber} x1 始点x
	 * @param {nuber} y1 始点y
	 * @param {number} x2 終点x
	 * @param {number} y2 終点y
	 * @param {string | CanvasGradient | CanvasPattern} color 描画色(デフォルト: `null`)
	 */
	drawLine(x1, y1, x2, y2, color = null){
		if(this._usePositionFix){
			x1 += 0.5;
			y1 += 0.5;
			x2 += 0.5;
			y2 += 0.5;
		}
		if(color !== null)this._context.strokeStyle = color;
		this._context.beginPath();
		this._context.moveTo(x1, y1);
		this._context.lineTo(x2, y2);
		this._context.stroke();
	}

	/**
	 * 四角形を描画します。  
	 * colorを省略するか`null`を指定した場合は直前に使用された色が使われます。
	 * @param {number} x 始点x
	 * @param {number} y 始点y
	 * @param {number} width 幅
	 * @param {number} height 高さ
	 * @param {string | CanvasGradient | CanvasPattern} color 描画色(デフォルト: `null`)
	 * @param {boolean} isFill 塗りつぶしフラグ(デフォルト: `true`)
	 */
	drawRect(x, y, width, height, color = null, isFill = true){
		if(isFill){
			if(color !== null)this._context.fillStyle = color;
			this._context.fillRect(x, y, width, height);
		}else{
			if(this._usePositionFix){
				x += 0.5;
				y += 0.5;
			}
			if(color !== null)this._context.strokeStyle = color;
			this._context.strokeRect(x, y, width, height);
		}
	}

	/**
	 * 角丸四角形を描画します。  
	 * colorを省略するか`null`を指定した場合は直前に使用された色が使われます。
	 * @param {number} x 始点x
	 * @param {number} y 始点y
	 * @param {number} width 幅
	 * @param {number} height 高さ
	 * @param {number} r 角丸の半径
	 * @param {string | CanvasGradient | CanvasPattern} color 描画色(デフォルト: `null`)
	 * @param {boolean} isFill 塗りつぶしフラグ(デフォルト: `true`)
	 */
	drawRoundedRect(x, y, width, height, r, color = null, isFill = true){
		this._context.beginPath();
		this._context.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
		this._context.arc(x + width - r, y + r, r, Math.PI * 1.5, 0);
		this._context.arc(x + width - r, y + height - r, r, 0, Math.PI * 0.5);
		this._context.arc(x + r, y + height - r, r, Math.PI * 0.5, Math.PI);
		this._context.closePath();
		if(isFill){
			if(color !== null)this._context.fillStyle = color;
			this._context.fill();
		}else{
			if(this._usePositionFix){
				x += 0.5;
				y += 0.5;
			}
			if(color !== null)this._context.strokeStyle = color;
			this._context.stroke();
		}
	}

	/**
	 * 円を描画します。  
	 * colorを省略するか`null`を指定した場合は直前に使用された色が使われます。
	 * @param {number} x 始点x
	 * @param {number} y 始点y
	 * @param {number} r 円の半径
	 * @param {string | CanvasGradient | CanvasPattern} color 描画色(デフォルト: `null`)
	 * @param {boolean} isFill 塗りつぶしフラグ(デフォルト: `true`)
	 */
	drawCircle(x, y, r, color = null, isFill = true){
		this._context.beginPath();
		this._context.arc(x, y, r, 0, Math.PI * 2);
		this._context.closePath();
		if(isFill){
			if(color !== null)this._context.fillStyle = color;
			this._context.fill();
		}else{
			if(color !== null)this._context.strokeStyle = color;
			this._context.stroke();
		}
	}

	/**
	 * 文字列を描画します。  
	 * colorを省略するか`null`を指定した場合は直前に使用された色が使われます。
	 * @param {number} x 始点x
	 * @param {number} y 始点y
	 * @param {string} text 文字列
	 * @param {string | CanvasGradient | CanvasPattern} color 描画色(デフォルト: `null`)
	 * @param {boolean} isFill 塗りつぶしフラグ(デフォルト: `true`)
	 */
	drawText(x, y, text, color = null, isFill = true){
		if(this._usePositionFix){
			x += 0.5;
			y += 0.5;
		}
		if(isFill){
			if(color !== null)this._context.fillStyle = color;
			this._context.fillText(text, x, y);
		}else{
			if(color !== null)this._context.strokeStyle = color;
			this._context.strokeText(text, x, y);
		}
	}

	/**
	 * 直前に描画した図形の塗りつぶしを描画します。
	 * colorを省略するか`null`を指定した場合は直前に使用された色が使われます。
	 * @param {string | CanvasGradient | CanvasPattern} color 描画色(デフォルト: `null`)
	 */
	drawFill(color = null){
		if(color !== null)this._context.fillStyle = color;
		this._context.fill();
	}

	/**
	 * 直前に描画した図形の枠を描画します。
	 * colorを省略するか`null`を指定した場合は直前に使用された色が使われます。
	 * @param {string | CanvasGradient | CanvasPattern} color 描画色(デフォルト: `null`)
	 */
	drawStroke(color = null){
		if(color !== null)this._context.strokeStyle = color;
		this._context.stroke();
	}

	/**
	 * キャンバス全体を指定した色でクリアします。  
	 * colorを省略するか`null`を指定した場合は直前に使用された色が使われます。
	 * @param {string | CanvasGradient | CanvasPattern} color クリアする色(デフォルト: `null`)
	 */
	clear(color = null){
		if(color !== null)this._context.fillStyle = color;
		this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
	}
}
