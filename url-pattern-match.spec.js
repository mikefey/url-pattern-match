import match from './url-pattern-match';

describe('url-pattern-match', () => {
  test("returns null if the route doesn't match with a param", () => {
    const route = 'admin/lectures/:id'
    const path = 'student/lectures/1'
    const params = match(route, path)

    expect(params).toEqual(null)
  })

  test('returns the route params if the route matches with a param', () => {
    const route = 'admin/lectures/:lecture_id/courses/:course_id/edit'
    const path = 'admin/lectures/lecture-slug/courses/course-slug/edit'
    const params = match(route, path) || []

    expect(params[0]).toEqual('lecture-slug')
    expect(params[1]).toEqual('course-slug')
  })

  test("returns null if the route doesn't match with a wildcard", () => {
    const route = 'admin/*'
    const path = 'student/lectures/1'
    const params = match(route, path)

    expect(params).toEqual(null)
  })

  test('returns the route after the wildcard if the route matches with a wildcard', () => {
    const route = 'admin/*'
    const path = 'admin/lectures/1/edit'
    const params = match(route, path)

    expect(params).toEqual(['lectures/1/edit'])
  })

  test('anything after a wildcard should not be parsed', () => {
    const route = 'admin/:site_id/*/courses/:id/edit/*/test'
    const path = 'admin/2/test/courses/:id/edit/5/test'
    const params = match(route, path) || []

    expect(params[0]).toEqual('2')
    expect(params[1]).toEqual('test/courses/:id/edit/5/test')
  })
})
