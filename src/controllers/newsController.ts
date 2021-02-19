import { Request, Response } from 'express';
import News from '../models/News';

class NewsController {

    public async getAllNews (req: Request, res: Response) : Promise<void> {
        const news = await News.find();
        
        res.status(200).json({
            message: 'News',
            news
        })
    }

    public async getNews (req: Request, res: Response) : Promise<void> {
        const { id } = req.params;
        const news = await News.findById({ _id : id });

        res.status(200).json({
            message: 'Getting news',
            news
        })

    }

    public async createNews (req: Request, res: Response): Promise<void> {  
        console.log(req.body);
        const { title, content, author } = req.body;
        const news = new News({
            title, content, author
        });
        await news.save();

        res.status(200).json({
            message: 'News created',
            news
        })

    }

    public async editNews (req: Request, res: Response) : Promise<void> {
        const { title, content, author } = req.body;
        const { id } = req.params;
        const updated = await News.findByIdAndUpdate({ _id: id }, {
            title,
            content,
            author,
            updatedAt: Date.now()
        }, { new: true });

        res.status(200).json({
            message: 'Updated news',
            news: updated
        })
    }

    public async deleteNews (req: Request, res: Response) : Promise<void> {
        const { id } = req.params;
        const deleted = await News.findByIdAndDelete({_id: id});

        res.status(200).json({
            message: 'Deleted news',
            news: deleted
        })
    }
}

const newsController = new NewsController();

export default newsController;