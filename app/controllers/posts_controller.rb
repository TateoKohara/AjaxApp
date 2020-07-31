class PostsController < ApplicationController

  def index   #indexというインスタンスメソッドを定義した
    @posts = Post.all 
  end

  def new
  end
  
  def create
    Post.create(content: params[:content])
<<<<<<< Updated upstream
=======
    redirect_to action: :index
  end

  def checked

  


    post = Post.find(params[:id])
    if post.checked then
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }
>>>>>>> Stashed changes
  end

end
