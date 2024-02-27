const Article = require("./articles.schema");

class ArticleService {

    createArticle(article) {  
        const newArticle = new Article(article);
        return newArticle.save();
    }

    updateArticle(id, article) {
        
        const update =  Article.findByIdAndUpdate(id, article, { new: true });
        return update.save();
    }

    deleteArticle(id) {
        return Article.findByIdAndDelete(id);
    }

    getAll() {
        return Article.find();
    }

    async getUserArticles(userId) {
        try {
            const userArticles = await Article.find({ userId: userId }).select('-password').populate('userId', '-password');
            return userArticles;
        } catch (error) {
            throw new Error(error.message);
        }    }
}

module.exports = new ArticleService();
