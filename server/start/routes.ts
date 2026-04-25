import AutoSwagger from 'adonis-autoswagger';
import swagger from '#config/swagger';
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'





router
  .group(() => {
   


    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessToken, 'store'])
        router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')



    router
      .group(() => {
        router.get('/profile', [controllers.Profile, 'show'])
      })
      .prefix('account')
      .use(middleware.auth())




    const InterrestedsController = () => import('#controllers/interresteds_controller')
    const MembersController = () => import('#controllers/members_controller')
    const ProjectsController = () => import('#controllers/projects_controller') 
    const TeamsController = () => import('#controllers/teams_controller') 
    const ThemesController = () => import('#controllers/themes_controller')
    router
      .resource('interrested', InterrestedsController)

    router
      .resource('member', MembersController)

    router
      .resource('project', ProjectsController)

    router
      .resource('team', TeamsController) 
      
    router
      .resource('theme', )
  
  })
  .prefix('/api/v1')












router.get("/swagger", async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger);
});

// Renders Swagger-UI and passes YAML-output of /swagger
router.get("/docs", async () => {
  return AutoSwagger.default.ui("/swagger", swagger);
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead. If you want, you can pass proxy url as second argument here.
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
});
