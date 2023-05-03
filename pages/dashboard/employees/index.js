import "styled-components/macro";

import { AppShell, SubPage } from "../components";
import {
  Asterisk,
  Buildings,
  CheckSquareOffset,
  Clock,
  Eye,
  Hourglass,
  Lightning,
  PencilSimple,
  Plus,
  TrashSimple,
} from "@phosphor-icons/react";
import { Content, UICore } from "../../../components";
import { db, paths } from "../../../utils";
import { useDialog, useRender } from "../../../hooks";
import { useEffect, useState } from "react";
import { parse } from "date-fns";
import CreateEmployeeForm from "./forms/CreateEmployeeForm";
import Head from "next/head";
import { useRouter } from "next/router";
import UpdateEmployeeForm from "./forms/UpdateEmployeeForm";

export default function Dashboard() {
  const router = useRouter();
  const [employeeList, setEmployeeList] = useState([]);
  const [watch, refresh] = useRender();
  const [mutateEmployeeBody, setMutateEmployeeBody] = useState(null);

  let id = router?.query?.id;

  useEffect(async () => {
    setEmployeeList((await db.employee.readAll()) || []);
  }, [watch]);

  useEffect(async () => {
    if (id) {
      let employee = await db.employee.read(id);

      if (employee) {
        setMutateEmployeeBody(employee);
        toggleReadEmployeeModal();
      }
    }
  }, []);

  const columns = [
    {
      name: "Id",
      selector: "id",
      component: (row) => (
        <UICore.Text
          color="var(--text-light)"
          mt="2px"
          mb="2px"
          size="sm"
          className="truncate"
          style={{ maxWidth: "160px" }}
        >
          {row?.id}
        </UICore.Text>
      ),
    },
    {
      name: "Name",
      selector: "name",
      component: (row) => (
        <UICore.Text
          color="var(--text-light)"
          mt="2px"
          mb="2px"
          size="sm"
          className="truncate"
          style={{ maxWidth: "160px" }}
        >
          {row?.name}
        </UICore.Text>
      ),
    },
    {
      name: "Department",
      selector: "department",
      breakpoint: 540,
      component: (row) => (
        <UICore.Text
          color="var(--text-light)"
          mt="2px"
          mb="2px"
          size="sm"
          className="truncate"
          style={{ maxWidth: "160px" }}
        >
          {row?.department}
        </UICore.Text>
      ),
    },
    {
      name: "Tasks",
      selector: "taskCount",
      breakpoint: 540,
      component: (row) => (
        <UICore.Flex justify="flex-start">
          <UICore.Badge bg="var(--pending-bg)" color="var(--pending)">
            <small> {row?.tasks.length}</small>
          </UICore.Badge>
        </UICore.Flex>
      ),
    },
    {
      name: "Action",
      selector: "actions",
      component: (row) => (
        <div>
          <UICore.Flex gap="var(--space-xs)">
            <div>
              <UICore.Button
                aria-label="View"
                data-balloon-pos="up"
                bg="transparent"
                hover="var(--neutral-700)"
                kind="secondary"
                size="xs"
                onClick={() => {
                  setMutateEmployeeBody(row);
                  toggleReadEmployeeModal();
                }}
              >
                <Eye size={22} color="#ffffff" />
              </UICore.Button>
            </div>
            <div>
              <UICore.Button
                aria-label="Update"
                data-balloon-pos="up"
                bg="transparent"
                hover="var(--neutral-700)"
                kind="secondary"
                size="xs"
                onClick={() => {
                  setMutateEmployeeBody(row);
                  toggleUpdateEmployeeModal();
                }}
              >
                <PencilSimple size={22} color="#ffffff" />
              </UICore.Button>
            </div>
            <div>
              <UICore.Button
                aria-label="Delete"
                data-balloon-pos="up"
                bg="transparent"
                hover="var(--danger)"
                kind="secondary"
                size="xs"
                onClick={() => {
                  setMutateEmployeeBody(row);
                  toggleDeleteEmployeeModal();
                }}
              >
                <TrashSimple size={22} color="#ffffff" />
              </UICore.Button>
            </div>
          </UICore.Flex>
        </div>
      ),
    },
  ];

  const {
    open: isCreateEmployeeModalOpen,
    toggle: toggleCreateEmployeeModal,
    Dialog: CreateEmployeeModal,
  } = useDialog();

  const {
    open: isUpdateEmployeeModalOpen,
    toggle: toggleUpdateEmployeeModal,
    Dialog: UpdateEmployeeModal,
  } = useDialog();

  const {
    open: isReadEmployeeModalOpen,
    toggle: toggleReadEmployeeModal,
    Dialog: ReadEmployeeModal,
  } = useDialog();

  const {
    open: isDeleteEmployeeModalOpen,
    toggle: toggleDeleteEmployeeModal,
    Dialog: DeleteEmployeeModal,
  } = useDialog();

  return (
    <>
      <Head>
        <title>Employee</title>
        <meta name="description" content="PIOJ Tasks App" />
        <meta property="og:title" content="Employee" />
        <meta property="og:description" content="PIOJ Tasks App" />
      </Head>
      <main
        css={`
          color: var(--text-light);
          transition-timing-function: var(--animation);
          transition-duration: background var(--animation-duration);
          transition: background var(--animation-time);
        `}
      >
        <AppShell>
          <SubPage
            title="Employees"
            actions={
              <div>
                <UICore.Button
                  size="sm"
                  onClick={() => toggleCreateEmployeeModal()}
                >
                  <Plus size={22} /> <UICore.Space amount={1} /> Create Employee
                </UICore.Button>
              </div>
            }
          >
            <Content.Card>
              <UICore.DataTable
                data={employeeList}
                columns={columns}
                fallBack
              />
            </Content.Card>
          </SubPage>
        </AppShell>
      </main>

      <CreateEmployeeModal
        name="Create Employee"
        width="clamp(300px,40vw,500px)"
        close={() => {
          toggleCreateEmployeeModal();
        }}
        open={isCreateEmployeeModalOpen}
      >
        <CreateEmployeeForm
          onSuccess={() => {
            refresh();
            toggleCreateEmployeeModal();
          }}
        />
      </CreateEmployeeModal>

      <ReadEmployeeModal
        name={mutateEmployeeBody?.name}
        width="clamp(300px,40vw,500px)"
        close={() => {
          setMutateEmployeeBody(null);
          toggleReadEmployeeModal();
        }}
        open={isReadEmployeeModalOpen}
      >
        <UICore.Line
          variant="h"
          thickness="2px"
          length="100%"
          color="var(--neutral-500)"
          mg="var(--space-none)"
          mb="var(--space-xs)"
          pd="var(--space-none)"
        />
        <UICore.Text
          size="sm"
          mt="var(--space-md)"
          mb="var(--space-xxxs)"
          weight="400"
          color="var(--neutral-600)"
        >
          <UICore.Flex align="center">
            <Asterisk size={18} color="var(--neutral-600)" />
            <UICore.Space amount={1} />
            ID
          </UICore.Flex>{" "}
        </UICore.Text>

        <UICore.Text
          mt="var(--space-none)"
          mb="var(--space-md)"
          weight="400"
          color="var(--neutral-200)"
        >
          {mutateEmployeeBody?.id}
        </UICore.Text>

        <UICore.Text
          size="sm"
          mt="var(--space-md)"
          mb="var(--space-xxxs)"
          weight="400"
          color="var(--neutral-600)"
        >
          <UICore.Flex align="center">
            <Buildings size={18} color="var(--neutral-600)" />
            <UICore.Space amount={1} />
            DEPARTMENT
          </UICore.Flex>{" "}
        </UICore.Text>

        <UICore.Text
          mt="var(--space-none)"
          mb="var(--space-md)"
          weight="400"
          color="var(--neutral-200)"
        >
          {mutateEmployeeBody?.department}
        </UICore.Text>

        <UICore.Text
          size="sm"
          mt="var(--space-md)"
          mb="var(--space-xxxs)"
          weight="400"
          color="var(--neutral-600)"
        >
          <UICore.Flex align="center">
            <CheckSquareOffset size={18} color="var(--neutral-600)" />
            <UICore.Space amount={1} />
            TASKS
          </UICore.Flex>{" "}
        </UICore.Text>

        {mutateEmployeeBody?.tasks.map((task) => (
          <UICore.Box
            radius="2px"
            bg="var(--neutral-900)"
            key={task?.id}
            mb="var(--space-xxxs)"
          >
            <UICore.Flex justify="space-between" align="center">
              <UICore.Text
                mt="var(--space-none)"
                mb="var(--space-none)"
                weight="400"
                color="var(--neutral-200)"
                className="truncate"
                style={{ maxWidth: "180px" }}
              >
                {task?.title}
              </UICore.Text>
              <div>
                <UICore.Button
                  aria-label="View"
                  data-balloon-pos="up"
                  bg="transparent"
                  hover="var(--neutral-700)"
                  kind="secondary"
                  size="xs"
                  onClick={() => {
                    router.push(`${paths.DASHBOARD}?id=${task?.id}`);
                  }}
                >
                  <Eye size={22} color="#ffffff" />
                </UICore.Button>
              </div>
            </UICore.Flex>
            <UICore.Text
              size="sm"
              mt="var(--space-xxxs)"
              mb="var(--space-md)"
              weight="400"
              color="var(--neutral-400)"
            >
              Due{" "}
              {parse(task?.dueDate, "yyyy-MM-dd", new Date()).toDateString()}
            </UICore.Text>
            <UICore.Flex align="center" gap="var(--space-sm)">
              {task?.status === "not yet started" ? (
                <UICore.Badge bg="var(--pending-bg)" color="var(--pending)">
                  <UICore.Flex align="center">
                    <Hourglass size={18} color="#ffffff" />
                    <UICore.Space amount={1} /> not yet started
                  </UICore.Flex>
                </UICore.Badge>
              ) : task?.status === "in progress" ? (
                <UICore.Badge
                  bg="var(--in-progress-bg)"
                  color="var(--in-progress)"
                >
                  <UICore.Flex align="center">
                    <Lightning size={18} color="var(--in-progress)" />
                    <UICore.Space amount={1} /> in progress
                  </UICore.Flex>
                </UICore.Badge>
              ) : task?.status === "completed" ? (
                <UICore.Badge bg="var(--completed-bg)" color="var(--completed)">
                  <UICore.Flex align="center">
                    <CheckSquareOffset size={18} color="var(--completed)" />
                    <UICore.Space amount={1} /> completed
                  </UICore.Flex>
                </UICore.Badge>
              ) : task?.status === "past due" ? (
                <UICore.Badge bg="var(--past-due-bg)" color="var(--past-due)">
                  <UICore.Flex align="center">
                    <Clock size={18} color="var(--past-due)" />
                    <UICore.Space amount={1} /> past due
                  </UICore.Flex>
                </UICore.Badge>
              ) : (
                <UICore.Badge bg="var(--pending-bg)" color="var(--pending)">
                  <UICore.Flex align="center">
                    <Hourglass size={18} color="#ffffff" />
                    <UICore.Space amount={1} /> not yet started
                  </UICore.Flex>
                </UICore.Badge>
              )}
            </UICore.Flex>
          </UICore.Box>
        ))}
      </ReadEmployeeModal>

      <UpdateEmployeeModal
        name="Update Employee"
        width="clamp(300px,40vw,500px)"
        close={() => {
          toggleUpdateEmployeeModal();
        }}
        open={isUpdateEmployeeModalOpen}
      >
        <UpdateEmployeeForm
          onSuccess={() => {
            refresh();
            toggleUpdateEmployeeModal();
          }}
          id={mutateEmployeeBody?.id}
          data={mutateEmployeeBody}
        />
      </UpdateEmployeeModal>

      <DeleteEmployeeModal
        name="Delete Employee"
        width="clamp(300px,40vw,500px)"
        close={() => {
          toggleDeleteEmployeeModal();
        }}
        open={isDeleteEmployeeModalOpen}
      ></DeleteEmployeeModal>
    </>
  );
}
