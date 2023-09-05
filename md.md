
## Ngày bắt đầu 15/7
## Dự tính ngày kết thúc 15/11 

# task
   - auth
       - router:
         + login  [POST] /auth/login   => OK
         + register  [POST] /auth/register   => OK
         + logout  [POST] /auth/logout    => OK
         + reset password  [POST] /auth/reset-password   => OK
         + forgot password  [POST] /auth/forgot-password    => OK
         + verify email  [POST] /auth/verify-email    => OK
   - product
       - router
         + get all  product static  [GET] /products/static  => OK
         + get all product  [GET] /products  => OK
         + get detail produuct  [GET] /product  => OK
         + delete product  [DELETE]  /products/:slug  => OK
         + delete many product  [DELETE]  /products/delete-many   => OK
         + edit product  [PATCH]  /products/delete-many  => OK
         + add new product  [POST] /products    => OK

         + get all reviews of product [GET] /products/:productId/reviews

   - category
       - router
         + get all category  [GET] /categories => OK

   - color
       - router
         + get all color  [GET] /colors   => OK

   - provider
       - router
         + get all provider  [GET] /providers   => OK
    
    - user
       - router
         + get all user , query by email ,name ,pagination  [GET] /users   => OK

   - upload
       - router
         + upload one file  [POST] /upload/single  => OK
         + upload many files  [POST] /upload/multiple    => OK


   - address
      - router
         + get all address  [POST] /addresses   => OK
         + CRUD ( address user)  /addresses/users/:userId   => OK

   - user review
      - router
         + get all reviews  [GET] /userReviews => OK
         + post review in product by user [POST] /userReviews => OK

         + get detail review [GET] /userReviews/:reviewId => OK
         + delete detail review [DELETE] /userReviews/:reviewId => OK
         + patch review from product by user [PATCH] /userReviews/:reviewId => OK

       
         