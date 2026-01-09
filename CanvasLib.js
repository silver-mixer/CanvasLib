export default class Canvas{
	#canvas;
	#context;
	#usePositionFix;
	#fontDecorations;
	#fontSize;
	#fontFamily;
	
	/**
	 * Canvasを作成します。
	 * @param {number} width Canvasの幅
	 * @param {number} height Canvasの高さ
	 * @param {object} options オプション(デフォルト: `{}`)
	 */
	constructor(width, height, options = {}){
		this.#canvas = document.createElement('canvas');
		this.#canvas.width = width;
		this.#canvas.height = height;
		this.#context = this.#canvas.getContext('2d');
		this.#usePositionFix = (options.usePositionFix != null ? options.usePositionFix : true);
		this.#context.textAlign = 'left';
		this.#context.textBaseline = 'top';
		this.#fontDecorations = [];
		this.#fontSize = '10px';
		this.#fontFamily = 'sans-serif';
	}

	/**
	 * Canvasの要素を返します。
	 * @return {HTMLCanvasElement} Canvasの要素
	 */
	getElement(){
		return this.#canvas;
	}

	/**
	 * Canvasのコンテキストを返します。
	 * @return {CanvasRenderingContext2D} Canvasのコンテキスト
	 */
	getContext(){
		return this.#context;
	}

	/**
	 * Canvasのサイズを変更します。
	 * @param {number} width Canvasの幅
	 * @param {number} height Canvasの高さ
	 */
	setSize(width, height){
		this.#canvas.width = width;
		this.#canvas.height = height;
	}

	/**
	 * Canvasの幅を返します。
	 * @return {number} Canvasの幅
	 */
	getWidth(){
		return this.#canvas.width;
	}

	/**
	 * Canvasの高さを返します。
	 * @return {number} Canvasの高さ
	 */
	getHeight(){
		return this.#canvas.height;
	}

	#refreshFont(){
		this.#context.font = `${this.#fontDecorations.join(' ')} ${this.#fontSize} ${this.#fontFamily}`;
	}

	/**
	 * フォントの大きさを変更します。
	 * @param {number} size フォントの大きさ(px)
	 */
	setFontSize(size){
		this.#fontSize = `${size}px`;
		this.#refreshFont();
	}

	/**
	 * フォントファミリを変更します。
	 * @param {string} fontFamily フォントファミリ名
	 */
	setFontFamily(fontFamily){
		this.#fontFamily = fontFamily;
		this.#refreshFont();
	}

	/**
	 * フォントの装飾を配列で指定します。  
	 * 引数を省略した場合は現在の装飾を削除します。  
	 * decorationsの例: `['bold', 'italic']`
	 * @param {Array} decorations 装飾の配列(デフォルト: `[]`)
	 */
	setFontDecorations(decorations = []){
		this.#fontDecorations = [...decorations];
		this.#refreshFont();
	}

	/**
	 * フォントファミリ、サイズ、装飾を一括で変更します。  
	 * 引数を省略するか`null`を指定した場合は変更されません。
	 * @param {string} fontFamily フォントファミリ名(デフォルト: `null`)
	 * @param {number} size フォントの大きさ(px)(デフォルト: `null`)
	 * @param {Array} decorations 装飾の配列(デフォルト: `null`)
	 */
	setFont(fontFamily = null, size = null, decorations = null){
		if(fontFamily !== null)this.#fontFamily = fontFamily;
		if(size !== null)this.#fontSize = `${size}px`;
		if(decorations !== null)this.#fontDecorations = [...decorations];
		this.#refreshFont();
	}

	/**
	 * テキスト描画の水平方向の配置を変更します。  
	 * alignに指定できる文字列は`start`,`end`,`left`,`center`,`right`です。
	 * @param {string} align テキストの水平位置
	 */
	setTextAlign(align){
		this.#context.textAlign = align;
	}

	/**
	 * テキスト描画の垂直方向の配置を変更します。  
	 * baselineに指定できる文字列は`top`,`middle`,`bottom`,`hanging`,`alphabetic`,`ideographic`です。
	 * @param {string} baseline テキストの垂直位置
	 */
	setTextBaseline(baseline){
		this.#context.textBaseline = baseline;
	}

	/**
	 * 線の太さを変更します。
	 * @param {number} width 線の太さ
	 */
	setLineWidth(width){
		this.#context.lineWidth = width;
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
		if(this.#usePositionFix){
			x1 += 0.5;
			y1 += 0.5;
			x2 += 0.5;
			y2 += 0.5;
		}
		if(color !== null)this.#context.strokeStyle = color;
		this.#context.beginPath();
		this.#context.moveTo(x1, y1);
		this.#context.lineTo(x2, y2);
		this.#context.stroke();
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
			if(color !== null)this.#context.fillStyle = color;
			this.#context.fillRect(x, y, width, height);
		}else{
			if(this.#usePositionFix){
				x += 0.5;
				y += 0.5;
			}
			if(color !== null)this.#context.strokeStyle = color;
			this.#context.strokeRect(x, y, width, height);
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
		this.#context.beginPath();
		this.#context.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
		this.#context.arc(x + width - r, y + r, r, Math.PI * 1.5, 0);
		this.#context.arc(x + width - r, y + height - r, r, 0, Math.PI * 0.5);
		this.#context.arc(x + r, y + height - r, r, Math.PI * 0.5, Math.PI);
		this.#context.closePath();
		if(isFill){
			if(color !== null)this.#context.fillStyle = color;
			this.#context.fill();
		}else{
			if(this.#usePositionFix){
				x += 0.5;
				y += 0.5;
			}
			if(color !== null)this.#context.strokeStyle = color;
			this.#context.stroke();
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
		this.#context.beginPath();
		this.#context.arc(x, y, r, 0, Math.PI * 2);
		this.#context.closePath();
		if(isFill){
			if(color !== null)this.#context.fillStyle = color;
			this.#context.fill();
		}else{
			if(color !== null)this.#context.strokeStyle = color;
			this.#context.stroke();
		}
	}

	/**
	 * 多角形を描画します。  
	 * vertexesにはX座標とY座標を交互に入れた配列を指定します。(例: `[0, 0, 100, 0, 50, 50]`)  
	 * colorを省略するか`null`を指定した場合は直前に使用された色が使われます。
	 * @param {Array} vertexes 
	 * @param {string | CanvasGradient | CanvasPattern} color 描画色(デフォルト: `null`)
	 * @param {boolean} isFill 塗りつぶしフラグ(デフォルト: `true`)
	 */
	drawPolygon(vertexes, color = null, isFill = true){
		if(vertexes == null || vertexes.length < 2)return;
		this.#context.beginPath();
		this.#context.lineTo(vertexes[0], vertexes[1]);
		for(let i = 2; i < vertexes.length; i += 2){
			this.#context.moveTo(vertexes[i], vertexes[i + 1]);
		}
		this.#context.closePath();
		if(isFill){
			if(color !== null)this.#context.fillStyle = color;
			this.#context.fill();
		}else{
			if(color !== null)this.#context.strokeStyle = color;
			this.#context.stroke();
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
		if(this.#usePositionFix){
			x += 0.5;
			y += 0.5;
		}
		if(isFill){
			if(color !== null)this.#context.fillStyle = color;
			this.#context.fillText(text, x, y);
		}else{
			if(color !== null)this.#context.strokeStyle = color;
			this.#context.strokeText(text, x, y);
		}
	}

	/**
	 * 直前に描画した図形の塗りつぶしを描画します。
	 * colorを省略するか`null`を指定した場合は直前に使用された色が使われます。
	 * @param {string | CanvasGradient | CanvasPattern} color 描画色(デフォルト: `null`)
	 */
	drawFill(color = null){
		if(color !== null)this.#context.fillStyle = color;
		this.#context.fill();
	}

	/**
	 * 直前に描画した図形の枠を描画します。
	 * colorを省略するか`null`を指定した場合は直前に使用された色が使われます。
	 * @param {string | CanvasGradient | CanvasPattern} color 描画色(デフォルト: `null`)
	 */
	drawStroke(color = null){
		if(color !== null)this.#context.strokeStyle = color;
		this.#context.stroke();
	}

	/**
	 * キャンバス全体を指定した色でクリアします。  
	 * colorを省略するか`null`を指定した場合は直前に使用された色が使われます。  
	 * colorに`'clear'`を指定した場合はキャンバス全体を透明色でクリアします。
	 * @param {string | CanvasGradient | CanvasPattern} color クリアする色(デフォルト: `null`)
	 */
	clear(color = null){
		this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
		if(color !== null && color !== 'clear'){
			this.#context.fillStyle = color;
			this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
		}
	}
}
