class Boggle {
    constructor(boardId, secs = 60) {
        this.secs = secs;
        this.displayTimer();

        this.score = 0;
        this.words = new Set();
        this.board = $('#' + boardId);

        this.timer = setInterval(this.tick.bind(this), 1000);

        $('.add-word', this.board).on('submit', this.handleSubmit.bind(this));
    }

    displayWord(word) {
        $('.words', this.board).append($('<li>', { text: word }));
    }

    displayScore() {
        $('.score', this.board).text(this.score);
    }

    displayMessage(message, c) {
        $('.message', this.board)
            .text(message)
            .removeClass()
            .addClass(`message ${c}`);
    }
    async handleSubmitWord(evt) {
        evt.preventDefault();
        const $word = $('.word', this.board);

        let word = $word.val();
        if (!word) return;

        if (this.words.has(word)) {
            this.displayMessage(`${word} was already found!`, 'err');
            return;
        }

        const resp = await axios.get('/check-word', { params: { word: word } });
        if (resp.data.result === 'not-word') {
            this.displayMessage(`${word} is not a valid word`, 'err');
        } else if (resp.data.result === 'not-on-board') {
            this.displayMessage(
                `${word} is not a valid word on this board`,
                'err'
            );
        } else {
            this.displayWord(word);
            this.score += word.length;
            this.displayScore();
            this.words.add(word);
            this.displayMessage(`${word} was added`, 'success');
        }

        $word.val('').focus();
    }

    displayTimer() {
        $('.timer', this.board).text(this.secs);
    }

    async tick() {
        this.secs -= 1;
        this.displayTimer();

        if (this.secs === 0) {
            clearInterval(this.timer);
        }
    }
}
