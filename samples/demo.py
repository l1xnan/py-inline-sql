multi_str = """
string
string
"""

sql = "select * from demo;"

sql = "SELECT * FROM demo;"

sql = "select * from demo;"

sql = """--sql
select * from demo;
"""

sql = """--sql
select * from demo;
"""


table = "demo"

if True:
    sql = f"""
    SELECT * from { table };
    """

    jinja = """
      SELECT * from {{ table }};
    """

# duckdb
sql = """
SELECT   * exclude (a),  b, c
FROM
  demo
  left join k using(id)
where b is not null
"""

# CTE
sql = """
with a as (select * from {{ name1 }})
SELECT *
from {{ name2 }}
"""
